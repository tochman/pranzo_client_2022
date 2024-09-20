export const SE = {
  translation: {
    gdpr: {
      mainHeader: "Vi bryr oss om din integritet",
      mainMessage:
        'Genom att klicka på "Acceptera alla" samtycker du till lagring av cookies på din enhet för att förbättra navigeringen på webbplatsen, analysera webbplatsens användning och bistå i våra marknadsföringsinsatser.',
      acceptAll: "Acceptera alla",
      rejectAll: "Avvisa alla",
    },
    titles: {
      register: "PRANZO - Skapa ett konto",
      authenticate: "PRANZO - Logga in",
      resetPassword: "PRANZO - Återställ lösenord",
      changePassword: "PRANZO - Ändra lösenord",
    },
    dashboard: {
      headings: {
        myVenue: "Mitt företag",
        reports: {
          label: "Rapporter",
          subLabel: "Skapa och titta på statistik och rapporter",
        },
        setupVenue: {
          label: "Lägg till företag",
          subLabel: "Lägg till ett företag till din profil",
          subLabelLong:
            "Du måste ange lite mer inställningar innan du kan utfärda kort och kuponger.",
        },

        editVenue: {
          label: "Redigera företag",
          subLabel: "Uppdatera företagsinformation",
        },
        detailsVenue: {
          label: "Företagsuppgifter",
          subLabel: "Översikt av ditt företag",
        },
        vouchers: "Kort",
        viewAndManage: {
          label: "Hantera kort",
          subLabel: "Aktivera kort, skapa transaktioner, mm. ",
        },
        create: {
          label: "Skapa",
          subLabel: "Fyll på ditt lager av kort",
        },
      },
      content: {
        stats: {
          issuedVouchers: "Utfärdade stämpelkort",
          salesVouchers: "Försäljning stämpelkort",
          issuedGiftCards: "Utfärdade presentkort",
          salesGiftCards: "Försäljning presentkort",
        },
        charts: {
          salesOverviewNumbers: "Försäljning (antal)",
          salesOverviewValue: "Försäljning (värde)",
        },
        vouchers: {
          create: {
            createFormHeading: "Lägg till kort till lagret",
          },
          table: {
            code: "Kod",
            status: "Status",
            active: "Aktiv?",
            variant: "Variant",
            initialValue: "Värde",
            currentValue: "Saldo",
          },
          labels: {
            transactions: "Transaktioner",
            servings: "Antal: ",
            amount: "Total: ",
            createTransaction: "Skapa en transaktion",
            activate: "Aktivera kort",
            showInactive: "Visa lager",
            owner: "Ägare: ",
            issuer: "Utfärdare: ",
            presenter: "anonymt",
            servingsActions: {
              mainLabel: "Du kommer att minska kortets saldo med 1 portion.",
            },
            notFound: "Vi kunde inte hitta kortet med koden: {{code}}!",
            scanVoucher: "Scanna kort",
          },
        },
      },
    },
    forms: {
      elements: {
        optional: "(frivillig)",
        create: "Skapa",
        submit: "Skicka",
        logotype: "Logotyp",
        logotypePlaceholder: "Lägg till din logotyp",
        email: "Mailadress",
        mobilePass: "Skapa digitalt kort?",
        pdfCard: "Skapa PDF?",
        pdfVariant: "Välj design:",
        pdfLanguage: "Språk:",
        swedish: "Svenska",
        english: "Engelska",
        amount: "Antal",
        amountHelper: "Antal kort du vill lägga till ditt lager.",
        variant: "Korttyp",
        servingsVariant: {
          singular: "Förbrukningskort",
          plural: "Förbrukningskort",
        },
        cashVariant: {
          singular: "Presentkort",
          plural: "Presentkort",
        },
        variantHelper:
          "Välj den typ/variant av kort du vill skapa. Om du vill skapa andra typer av kort, gå igenom skapandeprocessen för varje typ.",
        valueServings: "Värde (portioner)",
        valueCash: "Värde (pengar)",
        selectVariant: "Välj typ av kort",
        selectServings: "Välj värde",
        selectCash: "Välje ett värde",
        selectValueHelper:
          "Välj värdet på varje kupong. Om du vill skapa kuponger med andra värden, skicka in ett formulär för varje värde.",
        cashAmount: "Att dra av:",
        cashAmountHelper:
          "Skriv in det totala värdet som din kund spenderade på varor eller tjänster.",
        availableForAffiliates: "Tillgänglig för partnerföretag",
        report: {
          mainHeader: "Skapa rapport",
          preview: "Förhandsgranska",
          deliver: "Skicka",
          variant: "Rapport",
          pages: "Sida {{page}} av {{pagesTotal}}",
          selectReportVariant: "Välj typ av rapport",
          variantHelper:
            "Du kan välja att skapa dagrapport för idag eller igår, men även skapa rapporter för vecko- eller månadsstatistik.",
          loading: "Laddar förhandsgranskning",
          loadingError: "Kunde inte ladda förhandsgranskningen. Försök igen",
          variants: {
            today: "Idag",
            yesterday: "Igår",
            thisWeek: "Denna vecka",
            previousWeek: "Föregående vecka",
            thisMonth: "Denna månad",
            previousMonth: "Föregående månad",
          },
        },
      },
      messages: {
        required: "Det här fältet är obligatoriskt",
        minLength: "Kortaste tillåtna längd är {{length}} tecken.",
        invalidEmail: "Det här är en ogiltig adress",
        submitNumber: "Var god ange ett nummer.",
        invalidVat: "Du angav momsnumret i ett ogiltigt format.",
        notUnique: "Den här e-postadressen används redan, välj en annan...",
        userNotFound:
          "Vi kunde inte hitta någon användare med den här mailadressen. Kontrollera din information...",
      },
    },

    venue: {
      setup: { heading: "Skapa företag" },
      edit: { heading: "Redigera företag" },
      formElements: {
        venueName: "Företagsnamn",
        venueLegalName: "Registrerat företagsnamn",
        venueOrganizationNumber: "Organisationsnummer",
        venueVatId: "Momsregistreringsnummer",
        venueOrganizationNumberHelper: "Anges i format: xxxxxx-xxxx",
        venueVatidHelper:
          "Ett momsregistreringsnummer eller VAT-nummer (internationellt) är ett nummer som bygger på organisationsnumret. För att organisationsnumret ska bli ett momsregistreringsnummer anges Sveriges landskod SE innan första siffran, och avslutas med 01.  SEXXXXXXXXXX01 ",
        venueVatValidationError: "Kunde inte validera momsregistreringsnummer",
        venueVatValidationInProgress: "Kontrollerar...",
        description: "Beskrivning",
        primaryEmail: "Primär mailadress",
        fileSizeExceedsLimit: "File size exceeds limit",
        imageDimensionsTooLarge: "Image dimensions too large",
        fileReadError: "File read error",
        logoErrorInstruction: "Vänligen kontrollera bildens storlek. Bredden ska vara mellan 1100 och 2000 pixlar och höjden ska vara mellan 300 och 800 pixlar.",

      },
      user: { heading: "Användare" },
      affiliate: {
        heading: "Partnerföretag",
        subHeading:
          "Du har inte lagt till några andra PRANZO-användare till ditt partnernätverk.",
        setup: {
          heading: "Lägg till ett partnerföretag",
          subHeading:
            "Genom att lägga till andra PRANZO-användare som partnerföretag, kommer du kunna utfärda kort och kuponger som kan accepteras hos dina partners",
        },
      },
    },
    authentication: {
      submit: "Skicka",
      signIn: {
        header: "Logga in på ditt konto",
        email: "Din mailadress",
        password: "Lösenord",
      },
      registerNewAccount: {
        header: "Skapa ett nytt konto",
        name: "Ditt namn",
        email: "Din mailadress",
        password: "Lösenord",
        passwordConfirmation: "Bekräfta ditt lösenord",
      },
      changePassword: {
        header: "Ändra lösenord",
        currentPassword: "Nuvarande lösenord",
        newPassword: "Nytt löseord",
        newPasswordConfirmation: "Bekräfta nytt lösenord",
      },
      resetPassword: {
        text: "Glömt lösenord? ",
        link: "Klicka här.",
        header: "Begär nytt lösenord",
        formHeader: "Välj ditt lösenord",
        subHeader:
          "Om du har glömt ditt lösenord, kan du begära ett nytt. Ett mail med instruktioner kommer att skickas till dig.",
      },
    },
    appBar: {
      signIn: "Logga in",
      signUp: "Registrera",
      nothingToSeeHere: "Registrera ett konto för att komma åt funktioner.",
      logOut: "Logga ut",
    },
    footer: {
      slogan: "Stämpelkort och presentkort på ett enklare sätt",
      slogan2:
        "Gör stämpel- och presentkortshanteringen enkel. Pranzo är en webbaserad plattform designad för att hjälpa företag att hantera stämpelkor eller presentkort, öka kundbehållningen och skapa lojalitetsprogram. Systemet tillåter företag att enkelt skapa och anpassa presentkort, spåra försäljning av presentkort och övervaka kortsaldon. Den har också funktioner som hjälper företag att bygga lojalitet genom att erbjuda belöningar och incitament till kunder som köper och använder korten. Dessutom tillhandahåller systemet detaljerad analys och rapporteringsfunktioner för att hjälpa företag att spåra och analysera kunders utgiftsvanor och fatta välgrundade beslut om deras presentkortsstrategi.",
    },
    hero: {
      mainSlogan: "Digitala stämpel- eller presentkort. Kom igång direkt!",
      promoText:
        "Gör stämpel- och presentkortshanteringen enkel. Pranzo är en webbaserad plattform designad för att hjälpa företag att hantera presentkort, öka kundbehållningen och skapa lojalitetsprogram.",
      walletsPromoText:
        "Koppla dina kort till Apple- och Google Plånbok eller skriv ut dem på plastkort. Du väljer det som passar dig och dina kunder.",
      subSlogan:
        "Du kan vara igång inom 10 minuter. Inget krångel eller dyra avgifter.",
      buttonText: "Kom igång!",
      ctaText:
        "Kom igång snabbt, enkelt och billigt. Vi debiterar dig endast om du faktiskt drar nytta av Pranzo-plattformen med en startavgift på 450 kr och 13kr per utfärdat kort.",
    },
    sellingPoints: {
      benefits: "Fördelar",
      subSlogan:
        "Minska manuell hantering. PRANZO använder QR-koder för att identifera vilka erbjudanden din kund kan ta del av och uppdaterar saldon i realtid.",
      pranzoExperience: {
        header: "Kom igång med Pranzo",
        subHeader: "Vi håller det enkelt.",
      },
      right: {
        header: "Framtidssäkrat",
        content:
          "Pappers- eller plastkort och kuponger är föråldrade. Tvinga inte dina kunder att behöva leta fram sina stämpel- eller presentkort och ta upp onödig tid i kassan. Allt som din kund behöver är en smart phone.",
      },
      middle: {
        header: "Mobilt",
        content:
          "Vad är det enda som dina gäster (nästan) alltid har i fickan? Mobiltelefonen! Borde inte dina erbjudanden finnas där också? PRANZO-kort levereras direkt till dina gästers mobiltelefon. Ingen separat app behövs!",
      },
      left: {
        header: "Statistik",
        content:
          "Med Pranzo blir din rapportering och ekonomistyrning mer hanterbar, vilket ger dig en enkel överblick över försäljning och insikter om effektiviteten i din uppsökande verksamhet och marknadsföring.",
      },
    },
    testimonials: {
      1: {
        content:
          "Vi hade en otrolig positiv upplevelse av att arbeta med Pranzo och var imponerade av att de gjorde så stor skillnad på bara tre veckor. Vårt team är så tacksamma för de underbara förbättringar de gjort och deras förmåga att bli bekant med produktkonceptet så snabbt.",
        sender: {
          name: "John Doe",
          title: "Krögare, The Other Place, Carbondale, CO",
        },
      },
    },
  },
};
