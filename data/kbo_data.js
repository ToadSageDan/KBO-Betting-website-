// KBO 2026 Season Data - Teams, Pitchers, Batters
// Data structured for betting analysis

const KBO_DATA = {
  teams: [
    { id: "KT",  name: "KT Wiz",        city: "Suwon",     stadium: "Suwon KT Wiz Park",              color: "#000000" },
    { id: "LG",  name: "LG Twins",       city: "Seoul",     stadium: "Jamsil Baseball Stadium",        color: "#C30452" },
    { id: "SSG", name: "SSG Landers",    city: "Incheon",   stadium: "SSG Landers Field",              color: "#CE0E2D" },
    { id: "NC",  name: "NC Dinos",       city: "Changwon",  stadium: "Changwon NC Park",               color: "#071D49" },
    { id: "KIA", name: "KIA Tigers",     city: "Gwangju",   stadium: "Gwangju-Kia Champions Field",    color: "#EA0029" },
    { id: "OB",  name: "Doosan Bears",   city: "Seoul",     stadium: "Jamsil Baseball Stadium",        color: "#131230" },
    { id: "SK",  name: "Hanwha Eagles",  city: "Daejeon",   stadium: "Hanwha Life Eagles Park",        color: "#FF6600" },
    { id: "LOT", name: "Lotte Giants",   city: "Busan",     stadium: "Sajik Baseball Stadium",         color: "#002B5C" },
    { id: "SAM", name: "Samsung Lions",  city: "Daegu",     stadium: "Daegu Samsung Lions Park",       color: "#074CA1" },
    { id: "HAN", name: "Kiwoom Heroes",  city: "Seoul",     stadium: "Gocheok Sky Dome",               color: "#820024" }
  ],

  pitchers: [
    {
      id: "p001", name: "Ko Young-pyo", team: "KT", throws: "R",
      stats2026: { era: 2.87, wins: 12, losses: 6, saves: 0, ip: 138.2, k: 142, bb: 38, whip: 1.08, era_plus: 142 },
      stats2025: { era: 3.21, wins: 14, losses: 8, ip: 162.1, k: 158, bb: 45 },
      stats2024: { era: 3.45, wins: 13, losses: 9, ip: 155.0, k: 147, bb: 41 },
      stats2023: { era: 3.68, wins: 11, losses: 10, ip: 149.2, k: 138, bb: 44 },
      vsTeams: {
        LG:  { era: 2.45, ip: 18.1, k: 22, bb: 5, record: "3-1" },
        SSG: { era: 3.86, ip: 14.0, k: 14, bb: 6, record: "1-2" },
        NC:  { era: 2.08, ip: 21.2, k: 25, bb: 4, record: "3-0" },
        KIA: { era: 4.15, ip: 13.0, k: 12, bb: 7, record: "1-2" },
        OB:  { era: 3.00, ip: 18.0, k: 19, bb: 5, record: "2-1" },
        SK:  { era: 2.61, ip: 20.2, k: 24, bb: 3, record: "3-1" },
        LOT: { era: 1.93, ip: 14.0, k: 18, bb: 2, record: "3-0" },
        SAM: { era: 3.38, ip: 10.2, k: 10, bb: 5, record: "1-2" },
        HAN: { era: 2.70, ip: 13.1, k: 15, bb: 4, record: "2-1" }
      },
      last5: [
        { date: "2026-08-10", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 9,  bb: 2 },
        { date: "2026-08-05", opp: "SSG", result: "L", ip: 5.2, er: 4, k: 6,  bb: 3 },
        { date: "2026-07-30", opp: "NC",  result: "W", ip: 8.0, er: 0, k: 11, bb: 1 },
        { date: "2026-07-25", opp: "KIA", result: "W", ip: 6.1, er: 2, k: 7,  bb: 2 },
        { date: "2026-07-20", opp: "OB",  result: "W", ip: 7.2, er: 1, k: 10, bb: 1 }
      ],
      last10: [
        { date: "2026-08-10", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 9,  bb: 2 },
        { date: "2026-08-05", opp: "SSG", result: "L", ip: 5.2, er: 4, k: 6,  bb: 3 },
        { date: "2026-07-30", opp: "NC",  result: "W", ip: 8.0, er: 0, k: 11, bb: 1 },
        { date: "2026-07-25", opp: "KIA", result: "W", ip: 6.1, er: 2, k: 7,  bb: 2 },
        { date: "2026-07-20", opp: "OB",  result: "W", ip: 7.2, er: 1, k: 10, bb: 1 },
        { date: "2026-07-15", opp: "SK",  result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-07-10", opp: "LOT", result: "W", ip: 8.1, er: 1, k: 9,  bb: 0 },
        { date: "2026-07-05", opp: "SAM", result: "L", ip: 5.0, er: 3, k: 5,  bb: 4 },
        { date: "2026-06-30", opp: "HAN", result: "W", ip: 7.0, er: 2, k: 8,  bb: 1 },
        { date: "2026-06-25", opp: "LG",  result: "W", ip: 6.2, er: 1, k: 7,  bb: 2 }
      ],
      situational: {
        home:  { era: 2.55, ip: 72.1, record: "7-2" },
        away:  { era: 3.18, ip: 66.1, record: "5-4" },
        day:   { era: 2.80, ip: 51.1, record: "5-2" },
        night: { era: 2.91, ip: 87.1, record: "7-4" },
        turf:  { era: 2.87, ip: 138.2, record: "12-6" },
        dome:  { era: 2.43, ip: 22.1, record: "3-0" }
      }
    },
    {
      id: "p002", name: "Im Chan-kyu", team: "LG", throws: "R",
      stats2026: { era: 3.15, wins: 11, losses: 7, saves: 0, ip: 131.1, k: 128, bb: 42, whip: 1.18, era_plus: 131 },
      stats2025: { era: 3.52, wins: 10, losses: 9, ip: 148.2, k: 136, bb: 48 },
      stats2024: { era: 3.78, wins: 9,  losses: 10, ip: 140.1, k: 122, bb: 51 },
      stats2023: { era: 4.02, wins: 8,  losses: 11, ip: 133.0, k: 115, bb: 55 },
      vsTeams: {
        KT:  { era: 3.21, ip: 14.0, k: 14, bb: 5, record: "1-2" },
        SSG: { era: 2.70, ip: 16.2, k: 17, bb: 4, record: "2-1" },
        NC:  { era: 3.86, ip: 11.2, k: 11, bb: 6, record: "1-2" },
        KIA: { era: 2.45, ip: 18.1, k: 20, bb: 3, record: "3-0" },
        OB:  { era: 4.50, ip: 12.0, k: 10, bb: 8, record: "1-2" },
        SK:  { era: 2.89, ip: 18.2, k: 19, bb: 5, record: "3-1" },
        LOT: { era: 3.14, ip: 14.1, k: 14, bb: 4, record: "2-1" },
        SAM: { era: 2.61, ip: 20.2, k: 22, bb: 4, record: "3-0" },
        HAN: { era: 3.45, ip: 13.0, k: 12, bb: 6, record: "2-2" }
      },
      last5: [
        { date: "2026-08-11", opp: "KT",  result: "L", ip: 5.1, er: 3, k: 6, bb: 3 },
        { date: "2026-08-06", opp: "SSG", result: "W", ip: 7.0, er: 2, k: 8, bb: 2 },
        { date: "2026-08-01", opp: "NC",  result: "L", ip: 4.2, er: 4, k: 5, bb: 4 },
        { date: "2026-07-26", opp: "KIA", result: "W", ip: 8.0, er: 1, k: 9, bb: 1 },
        { date: "2026-07-21", opp: "OB",  result: "L", ip: 5.0, er: 4, k: 4, bb: 5 }
      ],
      last10: [
        { date: "2026-08-11", opp: "KT",  result: "L", ip: 5.1, er: 3, k: 6,  bb: 3 },
        { date: "2026-08-06", opp: "SSG", result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-08-01", opp: "NC",  result: "L", ip: 4.2, er: 4, k: 5,  bb: 4 },
        { date: "2026-07-26", opp: "KIA", result: "W", ip: 8.0, er: 1, k: 9,  bb: 1 },
        { date: "2026-07-21", opp: "OB",  result: "L", ip: 5.0, er: 4, k: 4,  bb: 5 },
        { date: "2026-07-16", opp: "SK",  result: "W", ip: 7.1, er: 2, k: 8,  bb: 2 },
        { date: "2026-07-11", opp: "LOT", result: "W", ip: 6.0, er: 1, k: 7,  bb: 3 },
        { date: "2026-07-06", opp: "SAM", result: "W", ip: 8.0, er: 0, k: 10, bb: 1 },
        { date: "2026-07-01", opp: "HAN", result: "W", ip: 6.2, er: 3, k: 7,  bb: 2 },
        { date: "2026-06-26", opp: "KT",  result: "L", ip: 4.1, er: 5, k: 4,  bb: 4 }
      ],
      situational: {
        home:  { era: 2.98, ip: 69.1, record: "6-3" },
        away:  { era: 3.32, ip: 62.0, record: "5-4" },
        day:   { era: 3.45, ip: 44.1, record: "3-3" },
        night: { era: 2.98, ip: 87.0, record: "8-4" },
        turf:  { era: 3.15, ip: 131.1, record: "11-7" },
        dome:  { era: 2.89, ip: 28.0, record: "3-1" }
      }
    },
    {
      id: "p003", name: "Kim Kwang-hyun", team: "SSG", throws: "L",
      stats2026: { era: 2.61, wins: 14, losses: 5, saves: 0, ip: 148.0, k: 165, bb: 33, whip: 0.98, era_plus: 163 },
      stats2025: { era: 2.89, wins: 16, losses: 7, ip: 172.2, k: 189, bb: 40 },
      stats2024: { era: 3.12, wins: 15, losses: 8, ip: 165.1, k: 178, bb: 38 },
      stats2023: { era: 3.35, wins: 14, losses: 9, ip: 158.0, k: 169, bb: 42 },
      vsTeams: {
        KT:  { era: 2.35, ip: 19.1, k: 23, bb: 4, record: "3-0" },
        LG:  { era: 3.12, ip: 17.1, k: 19, bb: 5, record: "2-1" },
        NC:  { era: 2.08, ip: 21.2, k: 26, bb: 3, record: "3-0" },
        KIA: { era: 3.45, ip: 15.2, k: 17, bb: 6, record: "2-1" },
        OB:  { era: 2.70, ip: 20.0, k: 23, bb: 4, record: "3-1" },
        SK:  { era: 1.89, ip: 19.0, k: 24, bb: 3, record: "3-0" },
        LOT: { era: 2.45, ip: 14.2, k: 18, bb: 2, record: "2-0" },
        SAM: { era: 3.21, ip: 11.1, k: 13, bb: 4, record: "1-1" },
        HAN: { era: 2.89, ip: 9.1,  k: 11, bb: 2, record: "2-1" }
      },
      last5: [
        { date: "2026-08-09", opp: "KT",  result: "W", ip: 8.0, er: 1, k: 10, bb: 1 },
        { date: "2026-08-04", opp: "LG",  result: "W", ip: 7.2, er: 2, k: 9,  bb: 2 },
        { date: "2026-07-30", opp: "NC",  result: "W", ip: 9.0, er: 0, k: 12, bb: 0 },
        { date: "2026-07-25", opp: "KIA", result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-07-20", opp: "OB",  result: "L", ip: 5.2, er: 4, k: 6,  bb: 3 }
      ],
      last10: [
        { date: "2026-08-09", opp: "KT",  result: "W", ip: 8.0, er: 1, k: 10, bb: 1 },
        { date: "2026-08-04", opp: "LG",  result: "W", ip: 7.2, er: 2, k: 9,  bb: 2 },
        { date: "2026-07-30", opp: "NC",  result: "W", ip: 9.0, er: 0, k: 12, bb: 0 },
        { date: "2026-07-25", opp: "KIA", result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-07-20", opp: "OB",  result: "L", ip: 5.2, er: 4, k: 6,  bb: 3 },
        { date: "2026-07-15", opp: "SK",  result: "W", ip: 7.1, er: 0, k: 9,  bb: 1 },
        { date: "2026-07-10", opp: "LOT", result: "W", ip: 8.0, er: 1, k: 11, bb: 1 },
        { date: "2026-07-05", opp: "SAM", result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-06-30", opp: "HAN", result: "W", ip: 8.1, er: 1, k: 10, bb: 0 },
        { date: "2026-06-25", opp: "KT",  result: "L", ip: 4.2, er: 5, k: 5,  bb: 4 }
      ],
      situational: {
        home:  { era: 2.30, ip: 78.1, record: "8-2" },
        away:  { era: 2.92, ip: 69.2, record: "6-3" },
        day:   { era: 2.41, ip: 56.0, record: "5-2" },
        night: { era: 2.71, ip: 92.0, record: "9-3" },
        turf:  { era: 2.61, ip: 148.0, record: "14-5" },
        dome:  { era: 2.20, ip: 36.1, record: "4-0" }
      }
    },
    {
      id: "p004", name: "Park Min-woo", team: "NC", throws: "R",
      stats2026: { era: 3.42, wins: 9, losses: 8, saves: 0, ip: 118.1, k: 109, bb: 48, whip: 1.28, era_plus: 119 },
      stats2025: { era: 3.89, wins: 8, losses: 10, ip: 132.0, k: 118, bb: 54 },
      stats2024: { era: 4.12, wins: 7, losses: 11, ip: 124.2, k: 108, bb: 57 },
      stats2023: { era: 4.35, wins: 6, losses: 12, ip: 118.1, k: 101, bb: 61 },
      vsTeams: {
        KT:  { era: 3.15, ip: 14.1, k: 13, bb: 5, record: "2-1" },
        LG:  { era: 4.50, ip: 12.0, k: 11, bb: 7, record: "1-2" },
        SSG: { era: 3.86, ip: 11.2, k: 10, bb: 6, record: "1-2" },
        KIA: { era: 2.89, ip: 15.2, k: 15, bb: 4, record: "2-1" },
        OB:  { era: 3.45, ip: 13.0, k: 12, bb: 5, record: "1-2" },
        SK:  { era: 3.00, ip: 15.0, k: 14, bb: 4, record: "2-1" },
        LOT: { era: 4.15, ip: 13.0, k: 11, bb: 6, record: "1-2" },
        SAM: { era: 2.70, ip: 13.1, k: 13, bb: 4, record: "2-1" },
        HAN: { era: 3.12, ip: 10.1, k: 9,  bb: 4, record: "1-1" }
      },
      last5: [
        { date: "2026-08-10", opp: "KT",  result: "W", ip: 6.0, er: 2, k: 7, bb: 3 },
        { date: "2026-08-05", opp: "LG",  result: "L", ip: 4.2, er: 5, k: 4, bb: 4 },
        { date: "2026-07-31", opp: "SSG", result: "L", ip: 5.0, er: 4, k: 5, bb: 4 },
        { date: "2026-07-26", opp: "KIA", result: "W", ip: 7.0, er: 2, k: 8, bb: 2 },
        { date: "2026-07-21", opp: "OB",  result: "W", ip: 6.1, er: 2, k: 7, bb: 3 }
      ],
      last10: [
        { date: "2026-08-10", opp: "KT",  result: "W", ip: 6.0, er: 2, k: 7, bb: 3 },
        { date: "2026-08-05", opp: "LG",  result: "L", ip: 4.2, er: 5, k: 4, bb: 4 },
        { date: "2026-07-31", opp: "SSG", result: "L", ip: 5.0, er: 4, k: 5, bb: 4 },
        { date: "2026-07-26", opp: "KIA", result: "W", ip: 7.0, er: 2, k: 8, bb: 2 },
        { date: "2026-07-21", opp: "OB",  result: "W", ip: 6.1, er: 2, k: 7, bb: 3 },
        { date: "2026-07-16", opp: "SK",  result: "W", ip: 6.0, er: 2, k: 6, bb: 2 },
        { date: "2026-07-11", opp: "LOT", result: "L", ip: 4.1, er: 5, k: 4, bb: 5 },
        { date: "2026-07-06", opp: "SAM", result: "W", ip: 7.0, er: 1, k: 8, bb: 2 },
        { date: "2026-07-01", opp: "HAN", result: "W", ip: 6.2, er: 2, k: 7, bb: 3 },
        { date: "2026-06-26", opp: "KT",  result: "L", ip: 4.2, er: 4, k: 5, bb: 4 }
      ],
      situational: {
        home:  { era: 3.12, ip: 60.1, record: "5-4" },
        away:  { era: 3.72, ip: 58.0, record: "4-4" },
        day:   { era: 3.58, ip: 43.2, record: "3-4" },
        night: { era: 3.32, ip: 74.2, record: "6-4" },
        turf:  { era: 3.42, ip: 118.1, record: "9-8" },
        dome:  { era: 3.15, ip: 25.2, record: "2-2" }
      }
    },
    {
      id: "p005", name: "Yang Hyeon-jong", team: "KIA", throws: "L",
      stats2026: { era: 3.05, wins: 13, losses: 6, saves: 0, ip: 141.2, k: 138, bb: 36, whip: 1.10, era_plus: 139 },
      stats2025: { era: 3.38, wins: 14, losses: 8, ip: 158.1, k: 152, bb: 42 },
      stats2024: { era: 3.62, wins: 12, losses: 9, ip: 150.0, k: 141, bb: 44 },
      stats2023: { era: 3.85, wins: 11, losses: 10, ip: 143.1, k: 133, bb: 47 },
      vsTeams: {
        KT:  { era: 2.89, ip: 18.2, k: 19, bb: 4, record: "3-1" },
        LG:  { era: 3.45, ip: 15.2, k: 16, bb: 5, record: "2-1" },
        SSG: { era: 4.15, ip: 13.0, k: 13, bb: 6, record: "1-2" },
        NC:  { era: 2.45, ip: 18.1, k: 20, bb: 3, record: "3-0" },
        OB:  { era: 3.21, ip: 16.2, k: 16, bb: 5, record: "2-2" },
        SK:  { era: 2.70, ip: 16.2, k: 18, bb: 4, record: "2-1" },
        LOT: { era: 3.86, ip: 14.0, k: 13, bb: 5, record: "1-2" },
        SAM: { era: 2.61, ip: 17.1, k: 19, bb: 3, record: "3-0" },
        HAN: { era: 3.00, ip: 12.0, k: 12, bb: 4, record: "2-1" }
      },
      last5: [
        { date: "2026-08-09", opp: "KT",  result: "W", ip: 7.2, er: 2, k: 9,  bb: 2 },
        { date: "2026-08-04", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 8,  bb: 2 },
        { date: "2026-07-30", opp: "SSG", result: "L", ip: 5.1, er: 4, k: 6,  bb: 3 },
        { date: "2026-07-25", opp: "NC",  result: "W", ip: 8.0, er: 0, k: 10, bb: 1 },
        { date: "2026-07-20", opp: "OB",  result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 }
      ],
      last10: [
        { date: "2026-08-09", opp: "KT",  result: "W", ip: 7.2, er: 2, k: 9,  bb: 2 },
        { date: "2026-08-04", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 8,  bb: 2 },
        { date: "2026-07-30", opp: "SSG", result: "L", ip: 5.1, er: 4, k: 6,  bb: 3 },
        { date: "2026-07-25", opp: "NC",  result: "W", ip: 8.0, er: 0, k: 10, bb: 1 },
        { date: "2026-07-20", opp: "OB",  result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-07-15", opp: "SK",  result: "W", ip: 6.1, er: 2, k: 7,  bb: 2 },
        { date: "2026-07-10", opp: "LOT", result: "L", ip: 4.2, er: 5, k: 5,  bb: 4 },
        { date: "2026-07-05", opp: "SAM", result: "W", ip: 7.2, er: 1, k: 9,  bb: 1 },
        { date: "2026-06-30", opp: "HAN", result: "W", ip: 7.0, er: 2, k: 8,  bb: 2 },
        { date: "2026-06-25", opp: "KT",  result: "W", ip: 6.2, er: 1, k: 7,  bb: 2 }
      ],
      situational: {
        home:  { era: 2.78, ip: 74.1, record: "7-3" },
        away:  { era: 3.32, ip: 67.1, record: "6-3" },
        day:   { era: 3.12, ip: 48.0, record: "5-2" },
        night: { era: 2.98, ip: 93.2, record: "8-4" },
        turf:  { era: 3.05, ip: 141.2, record: "13-6" },
        dome:  { era: 2.65, ip: 29.0, record: "3-0" }
      }
    },
    {
      id: "p006", name: "Raul Alcantara", team: "OB", throws: "R",
      stats2026: { era: 2.98, wins: 13, losses: 6, saves: 0, ip: 145.2, k: 168, bb: 35, whip: 1.05, era_plus: 145 },
      stats2025: { era: 3.22, wins: 15, losses: 7, ip: 168.0, k: 192, bb: 41 },
      stats2024: { era: 3.55, wins: 14, losses: 8, ip: 158.2, k: 177, bb: 38 },
      stats2023: { era: 3.78, wins: 12, losses: 9, ip: 152.1, k: 168, bb: 40 },
      vsTeams: {
        KT:  { era: 3.12, ip: 17.1, k: 21, bb: 4, record: "2-1" },
        LG:  { era: 2.45, ip: 18.1, k: 23, bb: 3, record: "3-0" },
        SSG: { era: 3.86, ip: 14.0, k: 16, bb: 5, record: "1-2" },
        NC:  { era: 2.70, ip: 16.2, k: 21, bb: 4, record: "3-0" },
        KIA: { era: 3.45, ip: 15.2, k: 18, bb: 4, record: "2-1" },
        SK:  { era: 2.25, ip: 20.0, k: 26, bb: 3, record: "3-0" },
        LOT: { era: 2.89, ip: 15.2, k: 19, bb: 4, record: "2-1" },
        SAM: { era: 4.15, ip: 13.0, k: 15, bb: 6, record: "1-2" },
        HAN: { era: 3.21, ip: 15.0, k: 18, bb: 4, record: "2-1" }
      },
      last5: [
        { date: "2026-08-10", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 10, bb: 2 },
        { date: "2026-08-05", opp: "SSG", result: "W", ip: 8.0, er: 2, k: 11, bb: 1 },
        { date: "2026-07-31", opp: "NC",  result: "W", ip: 7.2, er: 1, k: 10, bb: 2 },
        { date: "2026-07-26", opp: "KIA", result: "L", ip: 5.0, er: 4, k: 7,  bb: 3 },
        { date: "2026-07-21", opp: "KT",  result: "W", ip: 6.1, er: 2, k: 9,  bb: 2 }
      ],
      last10: [
        { date: "2026-08-10", opp: "LG",  result: "W", ip: 7.0, er: 1, k: 10, bb: 2 },
        { date: "2026-08-05", opp: "SSG", result: "W", ip: 8.0, er: 2, k: 11, bb: 1 },
        { date: "2026-07-31", opp: "NC",  result: "W", ip: 7.2, er: 1, k: 10, bb: 2 },
        { date: "2026-07-26", opp: "KIA", result: "L", ip: 5.0, er: 4, k: 7,  bb: 3 },
        { date: "2026-07-21", opp: "KT",  result: "W", ip: 6.1, er: 2, k: 9,  bb: 2 },
        { date: "2026-07-16", opp: "SK",  result: "W", ip: 7.0, er: 0, k: 10, bb: 1 },
        { date: "2026-07-11", opp: "LOT", result: "W", ip: 7.2, er: 2, k: 9,  bb: 1 },
        { date: "2026-07-06", opp: "SAM", result: "L", ip: 4.2, er: 5, k: 6,  bb: 4 },
        { date: "2026-07-01", opp: "HAN", result: "W", ip: 8.0, er: 1, k: 11, bb: 1 },
        { date: "2026-06-26", opp: "LG",  result: "W", ip: 7.1, er: 2, k: 9,  bb: 2 }
      ],
      situational: {
        home:  { era: 2.65, ip: 78.1, record: "8-2" },
        away:  { era: 3.31, ip: 67.1, record: "5-4" },
        day:   { era: 2.88, ip: 52.2, record: "5-2" },
        night: { era: 3.05, ip: 93.0, record: "8-4" },
        turf:  { era: 2.98, ip: 145.2, record: "13-6" },
        dome:  { era: 2.50, ip: 36.0, record: "4-0" }
      }
    }
  ],

  teamStats: {
    KT:  { wins: 62, losses: 48, runsScored: 512, runsAllowed: 443, last10: "6-4", last5: "3-2", homeRecord: "32-23", awayRecord: "30-25", runsPerGame: 4.7, runsByInning: [0.4,0.5,0.6,0.5,0.7,0.6,0.5,0.5,0.4], bullpenEra: 3.45, teamEra: 3.21 },
    LG:  { wins: 58, losses: 52, runsScored: 498, runsAllowed: 461, last10: "5-5", last5: "2-3", homeRecord: "30-25", awayRecord: "28-27", runsPerGame: 4.5, runsByInning: [0.4,0.4,0.5,0.5,0.6,0.5,0.5,0.4,0.3], bullpenEra: 3.78, teamEra: 3.52 },
    SSG: { wins: 66, losses: 44, runsScored: 541, runsAllowed: 412, last10: "7-3", last5: "4-1", homeRecord: "34-21", awayRecord: "32-23", runsPerGame: 4.9, runsByInning: [0.5,0.5,0.6,0.5,0.7,0.6,0.6,0.5,0.4], bullpenEra: 3.15, teamEra: 2.98 },
    NC:  { wins: 52, losses: 58, runsScored: 465, runsAllowed: 498, last10: "4-6", last5: "2-3", homeRecord: "27-28", awayRecord: "25-30", runsPerGame: 4.2, runsByInning: [0.4,0.4,0.4,0.5,0.5,0.5,0.4,0.4,0.3], bullpenEra: 4.12, teamEra: 3.89 },
    KIA: { wins: 60, losses: 50, runsScored: 507, runsAllowed: 452, last10: "6-4", last5: "3-2", homeRecord: "31-24", awayRecord: "29-26", runsPerGame: 4.6, runsByInning: [0.4,0.5,0.5,0.5,0.6,0.5,0.5,0.5,0.4], bullpenEra: 3.62, teamEra: 3.38 },
    OB:  { wins: 61, losses: 49, runsScored: 519, runsAllowed: 445, last10: "6-4", last5: "4-1", homeRecord: "32-23", awayRecord: "29-26", runsPerGame: 4.7, runsByInning: [0.5,0.5,0.6,0.5,0.6,0.5,0.5,0.5,0.4], bullpenEra: 3.42, teamEra: 3.18 },
    SK:  { wins: 49, losses: 61, runsScored: 441, runsAllowed: 512, last10: "3-7", last5: "1-4", homeRecord: "26-29", awayRecord: "23-32", runsPerGame: 4.0, runsByInning: [0.3,0.4,0.4,0.4,0.5,0.4,0.4,0.4,0.3], bullpenEra: 4.55, teamEra: 4.21 },
    LOT: { wins: 54, losses: 56, runsScored: 472, runsAllowed: 489, last10: "5-5", last5: "2-3", homeRecord: "28-27", awayRecord: "26-29", runsPerGame: 4.3, runsByInning: [0.4,0.4,0.5,0.4,0.5,0.5,0.4,0.4,0.3], bullpenEra: 3.98, teamEra: 3.72 },
    SAM: { wins: 57, losses: 53, runsScored: 489, runsAllowed: 471, last10: "5-5", last5: "3-2", homeRecord: "29-26", awayRecord: "28-27", runsPerGame: 4.4, runsByInning: [0.4,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.4], bullpenEra: 3.78, teamEra: 3.55 },
    HAN: { wins: 51, losses: 59, runsScored: 451, runsAllowed: 503, last10: "4-6", last5: "2-3", homeRecord: "27-28", awayRecord: "24-31", runsPerGame: 4.1, runsByInning: [0.3,0.4,0.4,0.4,0.5,0.4,0.4,0.4,0.3], bullpenEra: 4.32, teamEra: 4.05 }
  },

  batters: [
    {
      id: "b001", name: "Kang Baek-ho", team: "KT", bats: "R",
      stats2026: { avg: 0.312, obp: 0.401, slg: 0.521, ops: 0.922, hr: 22, rbi: 78, sb: 8, h: 118, ab: 378 },
      stats2025: { avg: 0.298, obp: 0.385, slg: 0.498, ops: 0.883, hr: 19, rbi: 71 },
      stats2024: { avg: 0.285, obp: 0.368, slg: 0.472, ops: 0.840, hr: 16, rbi: 64 },
      stats2023: { avg: 0.271, obp: 0.352, slg: 0.448, ops: 0.800, hr: 13, rbi: 55 },
      last5: [
        { date: "2026-08-12", opp: "LG",  ab: 4, h: 2, hr: 1, rbi: 2, result: "2-4, HR, 2RBI" },
        { date: "2026-08-11", opp: "LG",  ab: 3, h: 1, hr: 0, rbi: 0, result: "1-3, BB" },
        { date: "2026-08-10", opp: "LG",  ab: 4, h: 3, hr: 0, rbi: 1, result: "3-4, 2B, RBI" },
        { date: "2026-08-09", opp: "SSG", ab: 4, h: 0, hr: 0, rbi: 0, result: "0-4" },
        { date: "2026-08-08", opp: "SSG", ab: 3, h: 2, hr: 1, rbi: 2, result: "2-3, HR, 2RBI" }
      ]
    },
    {
      id: "b002", name: "Oh Ji-hwan", team: "LG", bats: "L",
      stats2026: { avg: 0.328, obp: 0.415, slg: 0.488, ops: 0.903, hr: 12, rbi: 58, sb: 18, h: 134, ab: 408 },
      stats2025: { avg: 0.315, obp: 0.398, slg: 0.465, ops: 0.863, hr: 10, rbi: 52 },
      stats2024: { avg: 0.301, obp: 0.381, slg: 0.441, ops: 0.822, hr: 8,  rbi: 44 },
      stats2023: { avg: 0.289, obp: 0.365, slg: 0.418, ops: 0.783, hr: 6,  rbi: 38 },
      last5: [
        { date: "2026-08-12", opp: "KT",  ab: 4, h: 2, hr: 0, rbi: 0, result: "2-4, 2B" },
        { date: "2026-08-11", opp: "KT",  ab: 3, h: 2, hr: 0, rbi: 0, result: "2-3, BB, SB" },
        { date: "2026-08-10", opp: "KT",  ab: 4, h: 1, hr: 0, rbi: 0, result: "1-4" },
        { date: "2026-08-09", opp: "OB",  ab: 4, h: 3, hr: 1, rbi: 2, result: "3-4, HR, 2RBI" },
        { date: "2026-08-08", opp: "OB",  ab: 3, h: 2, hr: 0, rbi: 1, result: "2-3, 2B, RBI" }
      ]
    },
    {
      id: "b003", name: "Choi Jung", team: "SSG", bats: "R",
      stats2026: { avg: 0.341, obp: 0.428, slg: 0.598, ops: 1.026, hr: 31, rbi: 95, sb: 5, h: 148, ab: 434 },
      stats2025: { avg: 0.325, obp: 0.411, slg: 0.571, ops: 0.982, hr: 28, rbi: 88 },
      stats2024: { avg: 0.308, obp: 0.392, slg: 0.545, ops: 0.937, hr: 25, rbi: 81 },
      stats2023: { avg: 0.291, obp: 0.374, slg: 0.518, ops: 0.892, hr: 21, rbi: 73 },
      last5: [
        { date: "2026-08-12", opp: "KIA", ab: 4, h: 3, hr: 1, rbi: 3, result: "3-4, HR, 3RBI" },
        { date: "2026-08-11", opp: "KIA", ab: 3, h: 2, hr: 0, rbi: 1, result: "2-3, 2B, RBI" },
        { date: "2026-08-10", opp: "KIA", ab: 4, h: 1, hr: 0, rbi: 0, result: "1-4, BB" },
        { date: "2026-08-09", opp: "NC",  ab: 4, h: 2, hr: 1, rbi: 2, result: "2-4, HR, 2RBI" },
        { date: "2026-08-08", opp: "NC",  ab: 4, h: 3, hr: 0, rbi: 2, result: "3-4, 2B, 2RBI" }
      ]
    }
  ],

  weather: {
    "Suwon KT Wiz Park":              { temp: 31, humidity: 72, wind: "NW 12km/h", condition: "Partly Cloudy", precip: 10 },
    "Jamsil Baseball Stadium":        { temp: 33, humidity: 78, wind: "SW 8km/h",  condition: "Humid",         precip: 20 },
    "SSG Landers Field":              { temp: 30, humidity: 68, wind: "NE 15km/h", condition: "Clear",         precip: 5  },
    "Changwon NC Park":               { temp: 32, humidity: 75, wind: "SE 10km/h", condition: "Hazy",          precip: 15 },
    "Gwangju-Kia Champions Field":    { temp: 33, humidity: 80, wind: "S 7km/h",   condition: "Muggy",         precip: 25 },
    "Hanwha Life Eagles Park":        { temp: 31, humidity: 71, wind: "NW 11km/h", condition: "Clear",         precip: 8  },
    "Sajik Baseball Stadium":         { temp: 30, humidity: 74, wind: "SE 13km/h", condition: "Partly Cloudy", precip: 12 },
    "Daegu Samsung Lions Park":       { temp: 34, humidity: 82, wind: "S 6km/h",   condition: "Hot & Humid",   precip: 18 },
    "Gocheok Sky Dome":               { temp: 24, humidity: 55, wind: "Dome",       condition: "Indoor",        precip: 0  }
  },

  todaysGames: [
    { gameId: "g001", homeTeam: "KT",  awayTeam: "LG",  time: "18:30", homePitcher: "p001", awayPitcher: "p002", stadium: "Suwon KT Wiz Park",         moneylineHome: -125, moneylineAway: +105, overUnder: 8.5, overOdds: -110, underOdds: -110, spread: -1.5, spreadOdds: +140 },
    { gameId: "g002", homeTeam: "SSG", awayTeam: "KIA", time: "18:30", homePitcher: "p003", awayPitcher: "p005", stadium: "SSG Landers Field",          moneylineHome: -165, moneylineAway: +140, overUnder: 7.5, overOdds: -115, underOdds: -105, spread: -1.5, spreadOdds: +125 },
    { gameId: "g003", homeTeam: "OB",  awayTeam: "NC",  time: "18:30", homePitcher: "p006", awayPitcher: "p004", stadium: "Jamsil Baseball Stadium",    moneylineHome: -145, moneylineAway: +122, overUnder: 8.0, overOdds: -110, underOdds: -110, spread: -1.5, spreadOdds: +130 },
    { gameId: "g004", homeTeam: "SAM", awayTeam: "SK",  time: "18:30", homePitcher: null,   awayPitcher: null,   stadium: "Daegu Samsung Lions Park",   moneylineHome: -110, moneylineAway: -110, overUnder: 9.0, overOdds: -115, underOdds: -105, spread: -1.5, spreadOdds: +160 },
    { gameId: "g005", homeTeam: "LOT", awayTeam: "HAN", time: "18:30", homePitcher: null,   awayPitcher: null,   stadium: "Sajik Baseball Stadium",     moneylineHome: -115, moneylineAway: -105, overUnder: 8.5, overOdds: -110, underOdds: -110, spread: -1.5, spreadOdds: +155 }
  ]
};
