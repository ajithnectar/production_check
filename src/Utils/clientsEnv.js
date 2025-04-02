const clientEnv = [
  {
    name: "NECTAR",
    graphqlURL: "https://assets.nectarit.com/api/graphql",
    username: "riyas@nectarit",
    password: "HoneyBee@2025",
    clients: [
      {
      clientDomain: "gge",
      searchLabel: "",
      },
      {
        clientDomain: "americana",
        searchLabel: "",
      },
      {
        clientDomain: "kanoo",
        searchLabel: "",
      },
      {
        clientDomain: "imdaad",
        searchLabel: "",
      },
      {
        clientDomain: "bfm",
        searchLabel: "",
      },
      {
        clientDomain: "pactive",
        searchLabel: "",
      },
      {
        clientDomain: "mediclinic",
        searchLabel: "",
      },
      {
        clientDomain: "arada",
        searchLabel: "",
      },
      {
        clientDomain: "ecovista",
        searchLabel: "",
      },
      {
        clientDomain: "leoloona",
        searchLabel: "",
      },
      {
        clientDomain: "uptown",
        searchLabel: "",
      },
      {
        clientDomain: "dpw",
        searchLabel: "",
      },
      {
        clientDomain: "sobha",
        searchLabel: "",
      },
      {
        clientDomain: "gems",
        searchLabel: "",
      },
      {
        clientDomain: "saba",
        searchLabel: "",
      },
      {
        clientDomain: "rakp",
        searchLabel: "",
      },
      {
        clientDomain: "arm",
        searchLabel: "",
      }
    ],
  },
  {
    name: "GGE doosan",
    graphqlURL: "https://assets.nectarit.com/api/graphql",
    username: "riyas@nectarit",
    password: "HoneyBee@2025",
    clients: [
      {
        clientDomain: "gge",
        searchLabel: "",
        make: ["Doosan"]
      },
    ],
  },
  // {
  //   name: "EMAAR ENV",
  //   graphqlURL: "https://esam.ecm.ae/api/graphql",
  //   username: "techsupport@emaar",
  //   password: "1056e91625455ac5f4c789ba94b8e0bc",
  //   clients: [
  //     {
  //       clientDomain: "emaar",
  //       searchLabel: "",
  //     }
  //   ],
  // },
  // {
  //   name: "EMAAR ENV",
  //   graphqlURL: "https://esam.ecm.ae/api/graphql",
  //   username: "techsupport@ehg",
  //   password: "0c6897bcd2714dac66a2fca1789697d4",
  //   clients: [
  //     {
  //       clientDomain: "ehg",
  //       searchLabel: "",
  //     }
  //   ],
  // },
  {
    name: "EXPO ENV",
    graphqlURL: "https://iot.expocitydubai.com/api/graphql",
    username: "support@ecd",
    password: "Tech@Sup@2025",
    clients: [
      {
        clientDomain: "ecd",
        searchLabel: ""
      }
    ],
  },
  {
    name: "Wind monitor",
    graphqlURL: "https://iot.expocitydubai.com/api/graphql",
    username: "support@ecd",
    password: "Tech@Sup@2025",
    clients: [
      {
        clientDomain: "ecd",
        searchLabel: "",
        type:["WindMonitorSystem"]
      }
    ],
  },
  {
    name: "AQSensor",
    graphqlURL: "https://iot.expocitydubai.com/api/graphql",
    username: "support@ecd",
    password: "Tech@Sup@2025",
    clients: [
      {
        clientDomain: "ecd",
        searchLabel: "",
        type:["AirQualitySensor"]
      }
    ],
  }
];

export default clientEnv;
