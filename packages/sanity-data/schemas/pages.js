// Schema to collect all pages in one schema

import frontPage from "./pages/frontPage";
import about from "./pages/about";
import contact from "./pages/contact";
import pridepark from "./pages/pridepark";
import pridehouse from "./pages/pridehouse";
import prideart from "./pages/prideart";
import prideparade from "./pages/prideparade";

export default {
  name: "pages",
  title: "Pages",
  type: "array",
  of: [frontPage, about, contact, prideparade, prideart, pridehouse, pridepark]
};
