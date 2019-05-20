import Sheet from "@/components/Sheet";
import { eventsActions, getEvents } from "@/store/events";
import { webResponseInitial } from "@/store/helpers";
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

const Events = props => {
  const { events } = props;

  if (events.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <>
      <PageTitle>Program 2019</PageTitle>

      {!events.data.length ? (
        <Sheet>
          <p>Kommer snart!</p>
        </Sheet>
      ) : null}

      {groupEventsByDay(events.data).map(day => {
        const currentDay = dayjs(day[0].startingTime);
        return (
          <Event key={currentDay.format("YYYY-MM-DD")}>
            <div>
              <EventDay>
                {currentDay.format("dddd")}{" "}
                <EventDate>{currentDay.format("D. MMMM")}</EventDate>
              </EventDay>
            </div>
            <div>
              {day.map(event => (
                <Link
                  key={event._id}
                  href={`/event?id=${event._id}`}
                  as={`/events/${event._id}`}
                >
                  <EventLink>
                    <a>
                      <EventTime>
                        {dayjs(event.startingTime).format("HH:mm")}-
                        {dayjs(event.endingTime).format("HH:mm")}
                      </EventTime>
                      <EventTitle>{event.title}</EventTitle>
                    </a>
                  </EventLink>
                </Link>
              ))}
            </div>
          </Event>
        );
      })}

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
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(Events);

const PageTitle = styled.h1`
  color: ${theme.purple};
  text-transform: uppercase;
`;

const Event = styled(Sheet)`
  width: 100%;
  max-width: 1000px;
  margin: 20px;
`;

const EventDay = styled.h2`
  font-size: 25px;
  color: ${theme.orange};
  text-transform: uppercase;
`;

const EventDate = styled.span`
  text-transform: uppercase;
  color: initial;
`;

const EventLink = styled.div`
  cursor: pointer;
  border-bottom: 2px solid lightgrey;
  padding: 10px 0;
  &:last-child {
    border-bottom: 0;
  }

  & > a {
    text-decoration: none;
  }
`;

const EventTime = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const EventTitle = styled.div`
  text-decoration: underline;
`;
