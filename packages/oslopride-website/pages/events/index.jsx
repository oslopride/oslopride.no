import EventList from "@/components/EventList";
import Filter from "@/components/Filter";
import useURLFilter, {
  resetFilter,
  setFilter
} from "@/components/Filter/useURLFilter";
import Sheet from "@/components/Sheet";
import { eventsActions, getEvents } from "@/store/events";
import { webResponseInitial } from "@/store/helpers";
import { getVenues, venuesActions } from "@/store/venues";
import theme from "@/utils/theme";
import NextSeo from "next-seo";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const arenaNameMapper = arena => {
  switch (arena) {
    case "0":
      return "Ekstern arena";
    case "1":
      return "Pride Parade";
    case "2":
      return "Pride Park";
    case "3":
      return "Pride House";
    case "4":
      return "Pride Art";
    default:
      return "Ukjent";
  }
};

const Events = props => {
  const { events, venues, query } = props;
  const [visible, setVisible] = useState(false);
  const filteredEvents = useURLFilter(events.data || [], query);

  const toggleFilter = () => setVisible(!visible);
  const defaultSelector = query.category || "-1";

  if (events.status !== "SUCCESS" || venues.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <>
      <Sheet>
        <PageTitle>Program 2019</PageTitle>

        <Filter
          selector={{
            defaultSelector,
            selectors: [
              {
                name: "Alle",
                value: "-1",
                callback: value => resetFilter("category")
              },
              {
                name: "Pride Parade",
                value: "1",
                callback: value => setFilter("category", "1")
              },
              {
                name: "Pride Park",
                value: "2",
                callback: value => setFilter("category", "2")
              },
              {
                name: "Pride House",
                value: "3",
                callback: value => setFilter("category", "3")
              },
              {
                name: "Pride Art",
                value: "4",
                callback: value => setFilter("category", "4")
              },
              {
                name: "Eksterne",
                value: "0",
                callback: value => setFilter("category", "0")
              }
            ]
          }}
        />

        {events.data.length ? (
          <EventList events={filteredEvents} venues={venues} />
        ) : (
          <p>Kommer snart!</p>
        )}
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

Events.getInitialProps = async ({ store, isServer, query }) => {
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

  return { query };
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
