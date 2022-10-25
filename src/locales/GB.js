export const GB = {
  translation: {
    dashboard: {
      headings: {
        myVenue: "My venue",
        reports: {
          label: "Reports",
          subLabel: "Generate and view statistics and reports",
        },
        setupVenue: {
          label: "Setup your venue",
          subLabel: "Add a venue to your profile",
          subLabelLong:
            "You have to go through some more setup and configuration before you can issue cards and vouchers.",
        },
        editVenue: {
          label: "Edit your venue",
          subLabel: "Update details of your venue",
        },
        detailsVenue: {
          label: "Venue details",
          subLabel: "Detailed view of your venue",
        },
        vouchers: "Vouchers",
        viewAndManage: {
          label: "View & manage",
          subLabel: "Manage your vouchers and cards.",
        },
        create: {
          label: "Create",
          subLabel: "Add inventory of vouchers",
        },
      },
      content: {
        stats: {
          issuedVouchers: "Issued Vouchers",
          salesVouchers: "Voucher Sales",
          issuedGiftCards: "Issued Gift Cards",
          salesGiftCards: "Gift Card Sales",
        },
        charts: {
          salesOverviewNumbers: "Sales Overview (in numbers)",
          salesOverviewValue: "Sales Overview (in value)",
        },
        vouchers: {
          create: {
            createFormHeading: "Create vouchers for inventory",
          },
          table: {
            code: "Code",
            status: "Status",
            active: "Active?",
            variant: "Variant",
            initialValue: "Value",
            currentValue: "Current value",
          },
          labels: {
            transactions: "Transactions",
            servings: "Servings: ",
            amount: "Amount: ",
            createTransaction: "Create transaction",
            activate: "Activate voucher",
            showInactive: "Show inventory",
            owner: "Owner: ",
            issuer: "Issued by: ",
            presenter: "holder of card",
            servingsActions: {
              mainLabel: "This will consume a serving on this voucher.",
            },
            notFound: "The voucher {{code}} was not found!",
            scanVoucher: "Scan Voucher",
          },
        },
      },
    },
    forms: {
      elements: {
        optional: "(optional)",
        create: "Create",
        submit: "Submit",
        email: "Email",
        mobilePass: "Add digital card?",
        pdfCard: "Add PDF card?",
        pdfVariant: "Choose card design:",
        pdfLanguage: "Language:",
        swedish: "Swedish",
        english: "English",
        amount: "Amount",
        amountHelper:
          "The number of vouchers you want to add to your inventory",
        variant: "Variant",
        servingsVariant: {
          singular: "Consumption card",
          plural: "Consumption cards",
        },
        cashVariant: {
          singular: "Gift card",
          plural: "Gift cards",
        },
        variantHelper:
          "Choose the variant of the cards you wish to create. If you wish to create other variants of vouchers, please go through the creation process for each variant.",
        valueServings: "Value (servings)",
        valueCash: "Value (money)",
        selectVariant: "Select a card variant",
        selectServings: "Select a value",
        selectCash: "Select a money value",
        selectValueHelper:
          "Choose the value of each voucher. If you wish to create vouchers with other values, please go through the creation process for each value.",
        cashAmount: "To deduct:",
        cashAmountHelper:
          "Type in the total of the value your customer spent on goods or services.",
        availableForAffiliates: "Available for Affiliates",
        report: {
          mainHeader: "Create report",
          preview: "Preview",
          deliver: "Deliver",
          variant: "Report variant",
          pages: "Page {{page}} of {{pagesTotal}}",
          selectReportVariant: "Choose type of report",
          variantHelper:
            "You can choose daily reports for the last 2 days, but also reports with weekly or monthly statis. ",
          loading: "Loading preview",
          loadingError: "Could not load the preview. Please try again.",
          variants: {
            today: "Today",
            yesterday: "Yesterday",
            thisWeek: "This week",
            previousWeek: "Previous week",
            thisMonth: "This month",
            previousMonth: "Previous month",
          },
        },
      },
      messages: {
        required: "This field is required.",
        minLength: "Minimum length should be {{length}}",
        invalidEmail: "This is an invalid email....",
        invalidVat: "You entered the VAT number in an invalid format.",
        submitNumber: "Please submit a number",
        notUnique: "This email needs to be unique, please use another one....",
        userNotFound:
          "We could not find a user with this email. Please check your records....",
      },
    },
    venue: {
      setup: { heading: "Set up your venue" },
      edit: { heading: "Edit your venue" },
      formElements: {
        venueName: "Name",
        venueVatid: "VAT number",
        venueVatidHelper: "A VAT registration number or VAT number (international) is a number based on the organization number. For the organization number to become a VAT registration number, enter Sweden's country code SE before the first digit, and end with 01. SEXXXXXXXXX01",
        description: "Description",
        primaryEmail: "Primary email",
      },
      user: { heading: "Users" },
      affiliate: {
        heading: "Affiliates",
        subHeading:
          "Tou have not added any PRANZO users to your affiliate network yet.",
        setup: {
          heading: "Add an affiliate",
          subHeading:
            "Adding other PRANZO users as affiliates to your network will allow you to issue vouchers that can be honored by your affiliates",
        },
      },
    },
    authentication: {
      submit: "Submit",
      signIn: {
        header: "Sign in to your account",
        email: "Your email",
        password: "Password",
      },
      registerNewAccount: {
        header: "Register a new account",
        name: "Your name",
        email: "Your email",
        password: "Password",
        passwordConfirmation: "Confirm your password",
      },
    },
    appBar: {
      signIn: "Sign In",
      signUp: "Sign Up",
      nothingToSeeHere: "Please register to access features",
    },
    footer: { slogan: "Voucher And Gift Card Management Made Easy" },
    hero: {
      mainSlogan: "Simplify your sales - Increase your revenue",
      promoText:
        "Making voucher and gift card management easy. Pranzo offers a simple and easy-to-use solution for creating, selling and administering pre-paid lunch- or gift cards.",
      subSlogan: "Low start-up fee and no subscriptions costs. Pay as you go!",
      walletsPromoText: "Connect your cards to Apple and Google Wallet.",
      buttonText: "Get started",
      ctaText:
        "There's no upfront fee to register. We will charge you only if you actually benefit from the Pranzo plattform with a one time set-up fee of €45 and €1 per issued voucher.",
    },
    sellingPoints: {
      benefits: "Benefits",
      subSlogan: "Let's move away from manual work",
      pranzoExperience: {
        header: "The Pranzo Experience",
        subHeader: "We keep it simple, for your benefit.",
      },
      right: {
        header: "Customer Loyalty",
        content:
          "Reward your loyal lunch guests with the opportunity to buy a lunch-card that gives them a discounted price while you benefit from increased and steady revenue.",
      },
      middle: {
        header: "Mobile friendly",
        content:
          "What is the one thing that your guests (almost) always have in their pockets? Shouldn't your offers be there too? PRANZO cards are delivered directly to your guests' mobile phones.",
      },
      left: {
        header: "Take control",
        content:
          "With Pranzo, your reporting and financial control becomes more manageable, giving you an easy overview of sales and insights into effectiveness of your outreach and marketing.",
      },
    },
    testimonials: {
      1: {
        content:
          "We had an incredible experience working with Pranzo and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly.",
        sender: {
          name: "John Doe",
          title: "Owner, The Other Place, Carbondale, CO",
        },
      },
    },
  },
};
