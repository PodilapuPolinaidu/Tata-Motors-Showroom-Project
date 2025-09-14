export const sidebarLinks = [
  { label: "Sign In", link: "#", highlight: true },
  { label: "Digital Showroom", link: "#" },
  { label: "Test Drive", link: "/test-drive" },
  { label: "Accessories", link: "#" },
  {
    label: "Service",
    link: "#",
    subMenu: [
      "Owner's Manual",
      "Bluetooth Compatability",
      "General Tips",
      "Fuel Saving Tips",
      "Best Value Service",
      "Value Added Service",
      "Racall information",
      "Android Auto User Guide",
      "Information On warranty",
      "Contact Us",
    ],
  },
  { label: "Exchange Car", link: "#" },
  { label: "Rewards", link: "#" },
  { label: "Account", link: "#" },
  { label: "Dealer Locator", link: "#" },
  { label: "Sitemap", link: "#" },
  {
    label: "About Us",
    link: "#",
    subMenu: ["Our Story", "News and Events"],
  },
];

export const carData = [
  {
    id: 1,
    name: "Curvv",
    image: new URL("../../assets/Curvvnav.webp", import.meta.url).href,
    link: "/cars/2",
  },
  {
    id: 2,
    name: "Curvv.ev",
    image: new URL("../../assets/curvv-evnav.webp", import.meta.url).href,
    link: "/cars/2",
  },
  {
    id: 3,
    name: "All New Altroz",
    link: "/cars/2",

    image: new URL("../../assets/altroz-nav.webp", import.meta.url).href,
    link: "/cars/1",
  },
  {
    id: 4,
    name: "Tiago",
    image: new URL("../../assets/tiagonav.webp", import.meta.url).href,
    link: "/cars/3",
  },
  {
    id: 5,
    name: "Tiago.ev",
    image: new URL("../../assets/tiago-ev nav.webp", import.meta.url).href,
    link: "/cars/3",
  },
  {
    id: 6,
    name: "Tigor",
    image: new URL("../../assets/tigor nav.webp", import.meta.url).href,
    link: "/cars/4",
  },
  {
    id: 7,
    name: "Tigor.ev",
    image: new URL(
      "../../assets/tigor-ve-xz-magnetic-red nav.webp",
      import.meta.url
    ).href,
    link: "/cars/4",
  },
  {
    id: 8,
    name: "Punch",
    image: new URL("../../assets/punch-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/5",
  },
  {
    id: 9,
    name: "Punch.ev",
    image: new URL(
      "../../assets/punch-ev-empowered-oxide nav.webp",
      import.meta.url
    ).href,
    link: "/cars/5",
  },
  {
    id: 10,
    name: "Nexon",
    image: new URL("../../assets/nexon nav.webp", import.meta.url).href,
    link: "/cars/6",
  },
  {
    id: 11,
    name: "Nexon.ev",
    image: new URL("../../assets/nexon ev.webp", import.meta.url).href,
    link: "#",
  },
  {
    id: 12,
    name: "Harrier",
    image: new URL("../../assets/harrier-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/7",
  },
  {
    id: 13,
    name: "Safari",
    image: new URL("../../assets/safari-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/6",
  },
];
