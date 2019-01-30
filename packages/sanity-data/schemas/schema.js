// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import article from "./article";
import partner from "./partner";
import frontPage from "./pages/frontPage";
import about from "./pages/about";
import contact from "./pages/contact";
import pridepark from "./pages/pridepark";
import pridehouse from "./pages/pridehouse";
import prideart from "./pages/prideart";
import prideparade from "./pages/prideparade";

import blockContent from "./blockContent";
import venue from "./venue";
import event from "./event";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "default",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    blockContent,
    article,
    partner,
    frontPage,
    about,
    contact,
    prideparade,
    prideart,
    pridehouse,
    pridepark,
    event,
    venue
  ])
});
