import { imageUrlFor } from "@/store/sanity";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Image from "./Image";

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

const EventPreview = props => {
  const event = props.event;
  const start = dayjs.utc(event.startingTime).add(2, "hour");
  const end = dayjs.utc(event.endingTime).add(2, "hour");

  return (
    <Link
      key={event._id}
      href={`/event?id=${event._id}`}
      as={`/events/${event._id}`}
      passHref
    >
      <Wrapper>
        <EventTimeDay>
          <OrangeColor>{start.format("dddd")} </OrangeColor>
          {start.format("D. MMMM YYYY")}
        </EventTimeDay>
        <Image
          src={
            event.image
              ? imageUrlFor(event.image)
                  .width(300)
                  .height(169)
                  .url()
              : "/static/event-placeholder.png"
          }
          alt="arrangementsbilde"
        />
        <EventTimeFromTo>
          {start.format("HH:mm")} - {end.format("HH:mm")}
          {", "}
          {displayEventType(event)}
        </EventTimeFromTo>
        <EventTitle id="title">{event.title}</EventTitle>
      </Wrapper>
    </Link>
  );
};

export default EventPreview;

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: initial;
  text-decoration: initial;
  border-radius: 2px;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;

  @media (min-width: 500px) {
    width: 47%;
  }

  @media (min-width: 900px) {
    width: 22%;
  }

  :hover,
  :focus {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const EventTimeDay = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
`;

const EventTimeFromTo = styled.div`
  font-size: 1rem;
`;

const OrangeColor = styled.span`
  color: ${theme.orange};
`;

const EventTitle = styled.div`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  line-height: 1.2em;

  @media (min-width: 500px) {
    font-size: 18px;
  }
`;
