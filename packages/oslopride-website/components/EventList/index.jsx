import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import Sticky from "react-sticky-el";
import styled from "styled-components";

const EventList = props => {
  const { events, venues } = props;

  const displayArena = event => {
    switch (event.category) {
      case "0":
        return "";
        break;
      case "1":
        return "Pride Parade, ";
        break;
      case "2":
        return "Pride Park, ";
        break;
      case "3":
        return "Pride House, ";
        break;
      case "4":
        return "Pride Art, ";
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

  const getVenueName = reference => {
    const venueData = venues.data.find(venue => venue._id === reference);
    return venueData.name;
  };

  return (
    <>
      {groupEventsByDay(events).map(day => {
        const currentDay = dayjs.utc(day[0].startingTime).add(2, "hour");
        return (
          <Event key={currentDay.format("YYYY-MM-DD")}>
            <Sticky>
              <EventDay>
                {currentDay.format("dddd")}{" "}
                <span>{currentDay.format("D. MMMM")}</span>
              </EventDay>
            </Sticky>
            <EventDayListWrapper>
              {day.map(event => (
                <Link
                  key={event._id}
                  href={`/event?id=${event._id}`}
                  as={`/events/${event._id}`}
                  passHref
                >
                  <EventLink>
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
                        {dayjs
                          .utc(event.startingTime)
                          .add(2, "hour")
                          .format("HH:mm")}
                        -
                        {dayjs
                          .utc(event.endingTime)
                          .add(2, "hour")
                          .format("HH:mm")}
                      </EventTime>
                      <EventPlace>
                        <Descriptor> Hvor: </Descriptor>
                        {displayArena(event)}
                        {event.location.venue
                          ? getVenueName(event.location.venue._ref)
                          : event.location.name}
                      </EventPlace>
                      <EventType>
                        <Descriptor> Type: </Descriptor>
                        {displayEventType(event)}
                      </EventType>
                    </EventInfo>
                  </EventLink>
                </Link>
              ))}
            </EventDayListWrapper>
          </Event>
        );
      })}
    </>
  );
};

const groupEventsByDay = events => {
  if (events.length === 0) {
    return [];
  }

  const sortedEvents = [...events];

  sortedEvents.sort(
    (a, b) =>
      dayjs.utc(a.startingTime).unix() - dayjs.utc(b.startingTime).unix()
  );

  const groupedEvents = [[sortedEvents[0]]];

  sortedEvents.slice(1).forEach(event => {
    const lastGroup = groupedEvents[groupedEvents.length - 1];
    const lastEvent = lastGroup[lastGroup.length - 1];

    const lastEventStart = dayjs.utc(lastEvent.startingTime).add(2, "hour");
    const currentEventStart = dayjs.utc(event.startingTime).add(2, "hour");

    if (
      lastEventStart.format("YYYY-MM-DD") ===
      currentEventStart.format("YYYY-MM-DD")
    ) {
      lastGroup.push(event);
    } else {
      groupedEvents.push([event]);
    }
  });
  return groupedEvents;
};

export default EventList;

const Event = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

const EventDay = styled.h2`
  background-color: ${theme.purple};
  width: 100%;
  margin: 0;
  font-size: 25px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  text-align: center;
`;

const EventLink = styled.a`
  cursor: pointer;
  border-bottom: 2px solid lightgrey;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const EventDayListWrapper = styled.div`
  margin-top: 20px;
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
