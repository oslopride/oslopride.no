import SanityBlockContent from "@/components/SanityBlockContent";
import Sheet from "@/components/Sheet";
import Error from "@/pages/_error";
import { eventsActions, getEvents } from "@/store/events";
import {
  foldWebResponse,
  mapWebResponse,
  webResponseStatus
} from "@/store/helpers";
import { imageUrlFor } from "@/store/sanity";
import { capitalizeString } from "@/utils";
import logError from "@/utils/sentry";
import theme from "@/utils/theme";
import dayjs from "dayjs";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Event = ({ event }) =>
  foldWebResponse(event, {
    initial: () => <Sheet>Laster...</Sheet>,
    request: () => <Sheet>Laster...</Sheet>,
    error: () => <Error statusCode={500} />,
    success: e => {
      if (e === undefined) return <Error statusCode={404} />;
      const {
        title,
        image,
        description,
        startingTime,
        endingTime,
        organizer,
        location,
        free,
        prices,
        ageLimit,
        deafInterpretation,
        accessible,
        _id,
        ticketSaleWebpage,
        eventWebpage
      } = e;

      const start = dayjs.utc(startingTime).add(2, "hour");
      const end = dayjs.utc(endingTime).add(2, "hour");

      return (
        <>
          <Sheet>
            <EventTimeDay>
              <OrangeColor>{start.format("dddd")} </OrangeColor>
              {start.format("D. MMMM YYYY")}
            </EventTimeDay>
            <EventTimeFromTo>
              {start.format("HH:mm")} - {end.format("HH:mm")}
            </EventTimeFromTo>
            <Title>{title}</Title>
            {image ? (
              <Image
                src={imageUrlFor(image)
                  .width(1000)
                  .height(500)
                  .url()}
                alt="arrangementsbilde"
              />
            ) : null}

            <SanityBlockContent blocks={description} />
            <Details>
              <OrangeColor as="h2">Detaljer</OrangeColor>
              <div>
                <strong>Arrangør: </strong>
                {organizer}
              </div>
              <div>
                <strong>Sted: </strong>
                {location.name && `${location.name}, `}
                {location.address}
                {location.venue && ` (${location.venue.name})`}
              </div>
              <div>
                <strong>Tidspunkt: </strong>
                {`${start.format("HH:mm")} - ${end.format("HH:mm")}`}
              </div>
              <div>
                <strong>Pris: </strong>
                {free
                  ? "Gratis"
                  : prices === undefined
                  ? "Ukjent"
                  : prices
                      .map(
                        ({ amount, priceLabel }) => `${amount} (${priceLabel})`
                      )
                      .join(", ")}
              </div>
              <div>
                <strong>Aldersgrense: </strong>
                {ageLimit === "0" ? "Fri aldersgrense" : `${ageLimit} år`}
              </div>
              <div>
                <strong>Tegnspråktolket: </strong>
                {deafInterpretation ? "Ja" : "Nei"}
              </div>
              <div>
                <strong>Rullestolvennlig: </strong>
                {accessible ? "Ja" : "Nei"}
              </div>
              <div>
                {ticketSaleWebpage ? (
                  <>
                    <strong>Lenke til billettsalg: </strong>
                    <LongLink href={ticketSaleWebpage}>
                      {ticketSaleWebpage}
                    </LongLink>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                {eventWebpage ? (
                  <>
                    <strong>Lenke til arrangement: </strong>
                    <LongLink href={eventWebpage}>{eventWebpage}</LongLink>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Details>
          </Sheet>

          <NextSeo
            config={{
              title: title,
              description: `${capitalizeString(
                start.format("dddd D. MMMM YYYY")
              )} ${start.format("HH:mm")} - ${end.format(
                "HH:mm"
              )} @ ${location.name && location.name + ", "}${location.address}`,
              openGraph: {
                type: "website",
                url: `https://www.oslopride.no/events/${_id}`,
                title,
                locale: "nb_NO",
                site_name: "Oslo Pride",
                title: title,
                description: `${capitalizeString(
                  start.format("dddd D. MMMM YYYY")
                )} ${start.format("HH:mm")} - ${end.format(
                  "HH:mm"
                )} @ ${location.name && location.name + ", "}${
                  location.address
                }`,
                images: [
                  {
                    url: image
                      ? imageUrlFor(image)
                          .width(1000)
                          .url()
                      : "https://www.oslopride.no/static/logo.jpg"
                  }
                ]
              }
            }}
          />
        </>
      );
    }
  });

Event.getInitialProps = async ctx => {
  const { query, store, isServer } = ctx;
  const { id } = query;
  const { events } = store.getState();

  if (events.status !== webResponseStatus.SUCCESS) {
    store.dispatch(eventsActions.request());

    if (isServer) {
      try {
        const response = await getEvents();
        store.dispatch(eventsActions.success(response));
      } catch (e) {
        logError(e, ctx);
        store.dispatch(eventsActions.failure("Unable to load events"));
      }
    }
  }

  return { id };
};

const Details = styled.div`
  * + * {
    margin-top: 10px;
  }
`;

const EventTimeDay = styled.div`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: bold;
`;

const EventTimeFromTo = styled.div`
  font-size: 1.1rem;
`;

const OrangeColor = styled.span`
  color: ${theme.orange};
`;

const EventTimeLabel = styled.span`
  font-weight: normal;
`;

const Title = styled.h1`
  color: ${theme.purple};
`;

const Image = styled.img`
  display: block;
  object-fit: cover;
  margin: 0 auto;
  width: 100%;
  max-height: 400px;
`;

const MultidayEventTime = styled.span`
  font-weight: normal;
`;

const LongLink = styled.a`
  word-break: break-word;
`;

const mapStateToProps = (state, { id }) => ({
  event: mapWebResponse(state.events, event =>
    event.find(({ _id }) => _id === id)
  )
});

export default connect(mapStateToProps)(Event);
