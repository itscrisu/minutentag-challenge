export const formatPrice = (priceInCents) => {
  const dollars = (priceInCents / 100).toFixed(2);
  return `$${dollars}`;
};

export const toProductSlug = (id, brand) => {
  const slug = brand.toLowerCase().replace(/\s+/g, '-');
  return `${id}-${slug}`;
};

export const parseProductSlug = (slug) => {
  const firstDash = slug.indexOf('-');
  if (firstDash === -1) return { id: null, brand: null };

  const id = parseInt(slug.substring(0, firstDash), 10);
  const brand = slug.substring(firstDash + 1);

  return { id, brand };
};
