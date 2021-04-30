export function getHomeLink(seller: boolean = false) {
  return seller ? '/seller' : '/';
}

export function getLoginLink() {
  return '/login';
}

export function getCartLink() {
  return 'cart';
}

export function getPersonalAreaLink(seller: boolean = false) {
  return seller ? '/seller/personal-area' : '/personal-area';
}

export function getPLPLink(seller: boolean = false) {
  return seller ? '/seller/plp' : '/plp';
}

export function getViewProductLink(id: string, seller: boolean = false) {
  return seller ? `/seller/pdp/${id}` : `/pdp/${id}`;
}

export function getEditProductLink(id: string) {
  return `/seller/pdp/edit/${id}`;
}

export function getNewProductLink() {
  return '/seller/pdp/new';
}

export function getCategoriesLink() {
  return '/seller/categories';
}
