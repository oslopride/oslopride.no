import Sheet from "@/components/Sheet";
import { eventsActions, getEvents } from "@/store/events";
import { webResponseInitial } from "@/store/helpers";
import { imageUrlFor } from "@/store/sanity";
import { getVenues, venuesActions } from "@/store/venues";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import NextSeo from "next-seo";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const groupEventsByDay = events => {
  if (events.length === 0) {
    return [];
  }

  const sortedEvents = [...events];

  sortedEvents.sort(
    (a, b) => dayjs(a.startingTime).unix() - dayjs(b.startingTime).unix()
  );

  const groupedEvents = [[sortedEvents[0]]];

  sortedEvents.slice(1).forEach(event => {
    const lastGroup = groupedEvents[groupedEvents.length - 1];
    const lastEvent = lastGroup[lastGroup.length - 1];

    const lastEventStart = dayjs(lastEvent.startingTime);
    const currentEventStart = dayjs(event.startingTime);

    if (lastEventStart.format("dddd") === currentEventStart.format("dddd")) {
      lastGroup.push(event);
    } else {
      groupedEvents.push([event]);
    }
  });

  return groupedEvents;
};

const displayArena = event => {
  switch (event.category) {
    case "0":
      return "Ekstern arena";
      break;
    case "1":
      return "Pride Parade";
      break;
    case "2":
      return "Pride Park";
      break;
    case "3":
      return "Pride House";
      break;
    case "4":
      return "Pride Art";
      break;
  }
};

const displayEventType = event => {
  switch (event.eventType) {
    case "0":
      return "Annet";
      break;
    case "1":
      return "Konsert";
      break;
    case "2":
      return "Debatt";
      break;
    case "3":
      return "Utstilling";
      break;
    case "4":
      return "Fest";
      break;
  }
};

const Events = props => {
  const { events, venues } = props;

  if (events.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  const getVenueName = reference => {
    const venueData = venues.data.find(venue => venue._id === reference);
    return venueData.name;
  };

  return (
    <>
      <Sheet>
        <PageTitle>Program 2019</PageTitle>

        {!events.data.length ? <p>Kommer snart!</p> : null}

        {groupEventsByDay(events.data).map(day => {
          const currentDay = dayjs(day[0].startingTime);
          return (
            <Event key={currentDay.format("YYYY-MM-DD")}>
              <EventDay>
                <h2>
                  {currentDay.format("dddd")}{" "}
                  <span>{currentDay.format("D. MMMM")}</span>
                </h2>
              </EventDay>
              <div>
                {day.map(event => (
                  <Link
                    key={event._id}
                    href={`/event?id=${event._id}`}
                    as={`/events/${event._id}`}
                  >
                    <EventLink>
                      <a>
                        {event.image ? (
                          <EventImage
                            src={imageUrlFor(event.image)
                              .height(250)
                              .url()}
                            alt="arrangementsbilde"
                          />
                        ) : (
                          <EventImage
                            src="/static/placeholder.jpg"
                            alt="arrangementsbilde"
                          />
                        )}

                        <EventInfo>
                          <EventTitle>{event.title}</EventTitle>
                          <EventTime>
                            {dayjs(event.startingTime).format("HH:mm")}-
                            {dayjs(event.endingTime).format("HH:mm")}
                          </EventTime>
                          <EventPlace>
                            <Descriptor> Hvor: </Descriptor>
                            {displayArena(event)},{" "}
                            {event.location.venue
                              ? getVenueName(event.location.venue._ref)
                              : event.location.name}
                          </EventPlace>
                          <EventType>
                            <Descriptor> Type: </Descriptor>
                            {displayEventType(event)}
                          </EventType>
                        </EventInfo>
                      </a>
                    </EventLink>
                  </Link>
                ))}
              </div>
            </Event>
          );
        })}
      </Sheet>

      <NextSeo
        config={{
          title: "Festivalprogram",
          description:
            "Festivalprogram til Norges største feiring av skeiv kjærlighet og mangfold.",
          openGraph: {
            type: "website",
            url: "https://oslopride.no/events",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Oslo Pride Festivalprogram",
            description:
              "Festivalprogram til Norges største feiring av skeiv kjærlighet og mangfold.",
            images: [
              { url: "https://oslopride.no/static/logo.jpg" },
              { url: "https://oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </>
  );
};

Events.getInitialProps = async ({ store, isServer }) => {
  if (store.getState().events.status === webResponseInitial().status) {
    store.dispatch(eventsActions.request());
    if (isServer) {
      try {
        const response = await getEvents();
        store.dispatch(eventsActions.success(response));
      } catch (e) {
        store.dispatch(eventsActions.failure(`${e}`));
      }
    }
  }
  if (store.getState().venues.status === webResponseInitial().status) {
    store.dispatch(venuesActions.request());
    if (isServer) {
      try {
        const response = await getVenues();
        store.dispatch(venuesActions.success(response));
      } catch (e) {
        store.dispatch(venuesActions.failure(`${e}`));
      }
    }
  }
};

const mapStateToProps = state => ({
  events: state.events,
  venues: state.venues
});

export default connect(mapStateToProps)(Events);

const PageTitle = styled.h1`
  color: ${theme.purple};
  text-transform: uppercase;
  text-align: center;
`;

const Event = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const EventDay = styled.div`
  background-color: ${theme.purple};
  width: 100%;

  h2 {
    font-size: 25px;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
`;

const EventLink = styled.div`
  cursor: pointer;
  border-bottom: 2px solid lightgrey;
  padding: 10px 0;

  &:last-child {
    border-bottom: 0;
  }

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const EventImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const EventInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-left: 20px;
  width: 100%;
`;

const EventTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 500;
`;

const EventTime = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.orange};
  margin-right: 10px;
`;

const EventPlace = styled.div`
  font-size: 18px;
  font-weight: 300;
  margin-right: 10px;
`;

const EventType = styled.div`
  font-size: 18px;
  font-weight: 300;
`;

const Descriptor = styled.span`
  font-size: 18px;
  font-weight: 500;
`;
