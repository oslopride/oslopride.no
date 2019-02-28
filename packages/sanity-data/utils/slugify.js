import sanityClient from "part:@sanity/base/client";
import slugify from "@sindresorhus/slugify";

export default type => async input => {
  const slug = slugify(input);
  const query = "count(*[_type==$type && slug.current==$slug]{_id})";
  const params = { slug, type };

  const count = await sanityClient.fetch(query, params);

  return count > 0 ? `${slug}-${count + 1}` : slug;
};
