export const VENDOR_NAV_ITEMS = [
  {
    label: "t('dashboard.headings.myVenue')",
    dataCy: "my-venue",

    children: [
      {
        label: "t('dashboard.headings.setupVenue')",
        subLabel: 'testing testing',
        dataCy: "venue-setup",
        href: "/dashboard/venue/setup",
        condition: "!vendor"
      },
      {
        label: "t('dashboard.headings.detailsVenue')",
        dataCy: "venue-setup",
        href: "/dashboard/venue",
        condition: "vendor"
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
