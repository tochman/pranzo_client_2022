export const VENDOR_NAV_ITEMS = [
  {
    label: "Your Venue",
    dataCy: "venue",

    children: [
      {
        label: "Setup your venue",
        dataCy: "venue-setup",
        href: "/dashboard/venue",
        condition: "!currentUser.vendor"
      },
      {
        label: "Venue details",
        dataCy: "venue-setup",
        href: "/dashboard/venue",
        condition: "currentUser.vendor"
      },
    ],
  },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Learn Design',
  //   href: '#',
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
];
