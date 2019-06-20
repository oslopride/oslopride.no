import EventList from "@/components/EventList";
import EventPreview from "@/components/EventPreview";
import Filter from "@/components/Filter";
import useURLFilter, {
  resetFilter,
  setFilter,
  toggleFilter
} from "@/components/Filter/useURLFilter";
import Sheet from "@/components/Sheet";
import { eventsActions, getEvents } from "@/store/events";
import { webResponseInitial } from "@/store/helpers";
import logError from "@/utils/sentry";
import theme from "@/utils/theme";
import NextSeo from "next-seo";
import React from "react";
import { connect } from "react-redux";
import Sticky from "react-sticky-el";
import styled from "styled-components";

const Events = props => {
  const { events, query } = props;
  const filteredEvents = useURLFilter(events.data || [], query, [
    "category",
    "official",
    "accessible",
    "deafInterpretation",
    "eventType"
  ]);

  const featuredEvents =
    filteredEvents.filter(x => x.isFeatured).slice(0, 4) || [];

  if (events.status !== "SUCCESS") {
    // TODO: Make a better UX while loading
    return <div>Laster ...</div>;
  }

  return (
    <>
      <Sheet>
        <PageTitle>Program 2019</PageTitle>
        <Filter
          selectors={[
            {
              name: "Alle",
              selected: query.category === undefined,
              callback: () => resetFilter("category")
            },
            {
              name: "Pride Parade",
              selected: query.category === "1",
              callback: () => setFilter("category", "1")
            },
            {
              name: "Pride Park",
              selected: query.category === "2",
              callback: () => setFilter("category", "2")
            },
            {
              name: "Pride House",
              selected: query.category === "3",
              callback: () => setFilter("category", "3")
            },
            {
              name: "Pride Art",
              selected: query.category === "4",
              callback: () => setFilter("category", "4")
            },
            {
              name: "Eksterne",
              selected: query.category === "0",
              callback: () => setFilter("category", "0")
            }
          ]}
          defaultSelector={query.category || "-1"}
          toggles={[
            {
              off: "Alle",
              on: "Arrangert av Oslo Pride",
              isOn: query.official === "true",
              callback: value => toggleFilter("official", "true")
            },
            {
              off: "Alle",
              on: "Rullestolvennlig",
              isOn: query.accessible === "true",
              callback: value => toggleFilter("accessible", "true")
            },
            {
              off: "Alle",
              on: "Tegnspråktolket",
              isOn: query.deafInterpretation === "true",
              callback: value => toggleFilter("deafInterpretation", "true")
            }
          ]}
          onDropdownSelect={value => {
            if (value && value !== "0") {
              setFilter("eventType", value);
            } else {
              resetFilter("eventType");
            }
          }}
          defaultDropdownValue={query.eventType || "0"}
          dropdownOptions={[
            {
              name: "Alle arrangementer",
              value: "0"
            },
            {
              name: "Fester",
              value: "4"
            },
            {
              name: "Konserter",
              value: "1"
            },
            {
              name: "Debatter",
              value: "2"
            },
            {
              name: "Utstillinger",
              value: "3"
            }
          ]}
        />

        {featuredEvents && featuredEvents.length > 0 && (
          <FeaturedEventsTitleWrapper>
            <Sticky style={{ zIndex: 2, position: "relative" }}>
              <FeaturedEventsTitle>Smakebiter</FeaturedEventsTitle>
            </Sticky>
          </FeaturedEventsTitleWrapper>
        )}

        <FeaturedEventsWrapper>
          {featuredEvents.map(e => (
            <EventPreview event={e} key={e._id} />
          ))}
        </FeaturedEventsWrapper>

        {events.data.length ? (
          <EventList events={filteredEvents} />
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
            url: "https://www.oslopride.no/events",
            locale: "nb_NO",
            site_name: "Oslo Pride",
            title: "Oslo Pride Festivalprogram",
            description:
              "Festivalprogram til Norges største feiring av skeiv kjærlighet og mangfold.",
            images: [
              { url: "https://www.oslopride.no/static/logo.jpg" },
              { url: "https://www.oslopride.no/static/prideheart.jpg" }
            ]
          }
        }}
      />
    </>
  );
};

Events.getInitialProps = async ctx => {
  const { store, isServer, query } = ctx;
  if (store.getState().events.status === webResponseInitial().status) {
    store.dispatch(eventsActions.request());
    if (isServer) {
      try {
        const response = await getEvents();
        store.dispatch(eventsActions.success(response));
      } catch (e) {
        logError(e, ctx);
        store.dispatch(eventsActions.failure());
      }
    }
  }
  return { query };
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(Events);

const PageTitle = styled.h1`
  color: ${theme.purple};
  text-transform: uppercase;
  text-align: center;
`;

const FeaturedEventsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: 1000px) {
    & > :first-child {
      margin-left: 0;
    }

    & > :last-child {
      margin-right: 0;
    }
  }
`;

const FeaturedEventsTitleWrapper = styled.div`
  margin-top: 20px;
`;

const FeaturedEventsTitle = styled.h2`
  background-color: ${theme.purple};
  width: 100%;
  margin: 0;
  font-size: 25px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  text-align: center;
  border-radius: 2px;
`;
