// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Scoring",
    href: "/scoring",
    noLink: true,
    items: [
      {
        title: "Appeal",
        href: "/appeal",
        items: [
          { title: "Ethos", href: "/ethos" },
          { title: "Pathos", href: "/pathos" },
          { title: "Logos", href: "/logos" },
        ],
      },
      {
        title: "Clarity",
        href: "/clarity",
        items: [
          {title: "Aspect",
            href: "/aspect"
          },
          {title: "Clause",
            href: "/clause",
            items: [
              {title: "Clause Types",
                href: "/clause-types"
              }
            ]
          }
        ]
      },
      { 
        title: "Style", 
        href: "/style",
        items: [
          {title: "Character",
            href: "/character",
            items: [
              {title: "Charcter Types",
                href: "/character-types"
              }
            ]
          }
        ]},
      { 
        title: "Critical Thinking",
        href: "/critical-thinking",
        items: [
          {
            title: "Argument",
            href: "/arguments"
          },
          {
            title: "Accuracy Risk",
            href: "/accuracy-risk"
          },
          {
            title: "Bias",
            href: "/bias"
          },
          {
            title: "Claim", 
            href: "/claims",
            items: [
              {
                title: "Claim Scores",
                href: "/claim-scores"
              },
              {
                title: "Claim Types",
                href: "/claim-types"
              }
            ]
          },
          {title: "Cognitive Strength",
            href: "/cognitive-strength",
            items: [
              {title: "Cognitive Dependability", 
                href: "/cognitive-dependability"
              },
              {title: "Cognitive Risk",
                href: "/cognitive-risk"
              }
            ]
          }
        ]
      },
      { 
        title: "Weights",
        href: "/weights",
        items: [
          {
            title: "Contextual Weight", 
            href: "/contextual-weight",
            items: [
              {
                title: "Age Range",
                href: "/age-range"
              },
              {
                title: "Alertness",
                href: "/alertness"
              }
            ]
          }
        ]
      },
    ],
  },
  {
    title: "References",
    href: "/references",
    noLink: true,
    items: [
      { title: "Internal", href: "/internal" },
      { title: "External", href: "/external" },
      { title: "Multi Modal", href: "/multi-modal" },
      { title: "Promoted", href: "/advertisment" },
    ],
  },
  {
    title: "Interactions",
    href: "/interactions",
    noLink: true,
    items: [
      { title: "Voting", href: "/voting" },
      { title: "Get References", href: "/get-references"},
      { title: "Reveal User", href: "/reveal-user" }
    ],
  },
  {
    title: "Data Visualization",
    href: "/data-visualization",
    noLink: true,
    items: [
      { title: "Rader Chart", href: "/rader-chart" },
      { title: "Heatmap", href: "/heatmap" },
      { title: "Line Chart", href: "/line-chart" },
      { title: "Navigable Tree", href: "/nav-tree" },
      { title: "Collabsible Bar Chart", href: "/collab-bar-chart" }
    ],
  },
];

export const RESEARCH_ROUTE: EachRoute[] = [
  {
    title: "Decision Science",
    href: "/decision-science",
  },
  {
    title: "Metacognition",
    href: "/metacognition",
  },
  {
    title: "Misinformation",
    href: "/misinformation",
  },
  {
    title: "Persuasion",
    href: "/persuasion",
  },
  {
    title: "Psychology",
    href: "/psychology",
  },
  {
    title: "Social Engineering",
    href: "/social-engineering",
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
