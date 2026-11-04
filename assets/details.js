const DETAILS = {
  'spy-ief-research-atlas': {
    /* Copy synced 2026-11-02 from the SPY/IEF delivery (presentation revision labels-2026-10-08):
       project-card.json and PROJECT_COPY_EN.md. Order on the page: question, one conclusion,
       methods, my part, results, scope. "My part" is a section here, not the opening block. */
    title: 'SPY / IEF Research Atlas',
    subtitle: 'When does stock–bond diversification weaken?',
    headline: 'How stable is the diversification relationship between U.S. equities and Treasury bonds?',
    tagline: 'Among each period’s worst 5% SPY days, IEF rose on 77.6% across the full sample (2002–2026), versus 40.0% in 2022–2023 and 48.6% in January 2024–October 2026, when stock–bond correlation point estimates were positive but their 95% intervals included zero.',
    chips: ['Python', 'JavaScript', 'Plotly', 'Time Series', 'Statistical Inference', 'Reproducibility'],
    screenshot: 'images/spy-ief-atlas.jpg',
    screenshotSize: [1280, 800],
    screenshotAlt: 'The interactive atlas, overview page: full-sample SPY and IEF daily-return correlation −0.29 beside the latest period’s +0.07, with the analysis-range control above',
    metrics: [
      { label: 'Aligned daily returns', value: '6,082' },
      { label: 'Data through', value: '2026-10-02' },
      { label: 'Interactive pages', value: '7' },
    ],
    sections: [
      ['01 · Methods',
        'I compared 6,082 aligned SPY/IEF daily returns from August 2002 through October 2026 using rolling correlations, period-level uncertainty, stress-day comparisons and walk-forward volatility evaluation. A seven-page interactive atlas lets readers inspect exact date ranges, upload price files, replay historical allocations and compare forecasts with persistence. An exploratory macro view pairs FRED’s 10-year breakeven inflation rate with quarterly stock–bond correlation, including HAC intervals and a trend sensitivity check.'],
      ['02 · My part',
        'I co-authored the 2024 course study with Zun Cao, focusing on the analysis, written findings and original seven-tab Dash app. I specified the later extension’s research questions and reviewed its implementation with AI coding assistance. This project is separate from my Guangzhou Futures internship work.'],
      ['03 · Results',
        '<span class="result-line">Full-sample daily correlation was −0.29 (95% moving-block interval −0.35 to −0.23). IEF rose on 236/304 of the worst 5% SPY days overall, compared with 17/35 during January 2024–October 2026.</span><span class="result-line">Across 95 eligible quarters, the association between mean 10-year breakeven inflation and stock–bond correlation was 0.31 per percentage point (approximate 95% HAC interval 0.11–0.50), or 0.32 (0.09–0.55) with a linear trend; excluding 2022+ quarters reduced it to 0.17 (−0.03–0.37, 76 quarters). The exclusion interval includes zero, so the full-sample association should not be treated as a rule that holds across eras.</span><span class="result-line">SPY HAR-type volatility MAE was 11.2% below persistence across 250 retrospective origins. In January 2022–December 2023, its MAE was 27.7% higher across only 24 origins; the paired ΔMAE interval (−0.017 to +0.116 daily-volatility percentage points) includes zero.</span>'],
      ['04 · Scope and limitations',
        'A joined return/index series, not original dollar prices. Descriptive analysis and retrospective evaluation; no causal explanation or dependable forecasting edge is established. Macro results are same-period associations, and forecast scores are retrospective. Data through <strong>2026-10-02</strong>; atlas presentation revision labels-2026-10-08.'],
    ],
    context: 'The atlas tests how much a full-sample average obscures changes across periods.',
    dashboard: 'projects/spy-ief/',
    offline: 'projects/spy-ief/offline.html',
  },

  /* Guangzhou Futures internship, summer 2026. Method-level description only: code and account data
     stay with the firm. Factor-platform facts (54 futures, five sectors, eight factors, the equal-weight
     result) are the owner's own account of the work; the NAV monitor's method (3/5/10-point slopes,
     the 10-minus-3 growth-rate gap, 0.20 / 0.35 %/day thresholds, five scored rules, post-signal
     drawdown calibration) is read from the monitor's source. No sample sizes or account figures here. */
  'quant-platform': {
    title: 'Futures Factor Platform and NAV Risk Monitor',
    subtitle: 'Two systems from a summer on an asset-management desk',
    headline: 'Which signals add anything, and when should an account take risk off?',
    tagline: 'As a quantitative research intern at Guangzhou Futures I built two systems for the asset-management desk. The first is a research platform that tests fundamental factors on commodity futures without letting the future leak into the backtest. The second, which I designed end to end, reads an account’s daily net value and turns the slope of that curve into graded de-risking alerts. Both run on whatever history the desk feeds them.',
    chips: ['Python', 'pandas', 'NumPy', 'JavaScript', 'Factor evaluation', 'Backtesting', 'Risk monitoring'],
    metrics: [
      { label: 'Commodity futures covered', value: '54', note: 'Five sectors; eight fundamental factors tested on the platform.' },
      { label: 'Slope horizons', value: '3 / 5 / 10 days', note: 'Least-squares slope of net value over the trailing points, scaled to percent per day.' },
      { label: 'De-risking thresholds', value: '0.20 / 0.35 %/day', note: 'Growth-rate gap, 10-day slope minus 3-day slope: observe above 0.20, act above 0.35.' },
      { label: 'Scored rules', value: '5', note: 'Each weighted and calibrated by the drawdown that followed its own signals; rules that did not verify are kept at low weight and labelled.' },
    ],
    sections: [
      [
        '01 · Question',
        'The desk asked two things. Of the fundamental factors it already watched, which ones add anything beyond the signals in use, and how would we know a backtest result means something? And once an account is making money, when should it take risk off: how much is enough, and what does slowing look like before it turns into a drawdown? The first question became a factor research platform. The second became a net-value risk monitor built around one measure, the slope of the account’s equity curve.'
      ],
      [
        '02 · Factor platform',
        'The platform covers 54 commodity futures in five sectors. Data availability, signal formation and execution are timestamped separately, so a factor can only use what was known when the trade would have been placed; this rules out look-ahead bias by construction rather than by inspection. Eight fundamental factors were evaluated with IC and ICIR, quintile backtests and single-factor attribution under one fixed backtest contract: the same rebalancing rule, trading rule and cost assumptions for every factor, so results are comparable. The platform also automated the desk’s daily data checks.'
      ],
      [
        '03 · NAV risk monitor',
        'The monitor is my own design. For each day it fits a least-squares line to the last 3, 5 and 10 net-value points and reads the slope as a growth rate in percent per day. The core measure is the gap between the 10-day and the 3-day slope: how much slower the account is growing now than over the past two weeks. Two thresholds turn that gap into a decision. Above 0.20 percent per day the account is on watch and the desk is told to think about locking in gains; above 0.35, or above 0.20 with the 3-day slope already negative, the monitor calls for a reduction. Four further rules add to a score: margin pressure rising while net value stalls, a loss taken at high margin usage, a new high whose 3-day slope has already dropped below the 5- and 10-day slopes, and volatility entering the account’s own top decile on a down day. The score maps to four levels, and only the top level says reduce. Every rule was calibrated the same way, by the worst drawdown in the days after its signals against the all-days baseline, and the two rules that did not separate from the baseline were kept at low weight and labelled as unverified on the page itself.'
      ],
      [
        '04 · System design',
        '<span class="result-line"><strong>One file, no server.</strong> The monitor is a single offline HTML page with the rules, the charts and the data inside it, so the desk can open it anywhere and hand it on.</span><span class="result-line"><strong>Any history.</strong> It takes a spreadsheet of daily net value or equity for any number of accounts and any length of history, recomputes slopes, drawdowns, volatility and alerts on the real date order without filling gaps, and can save itself as a new version with the updated data and rules embedded.</span><span class="result-line"><strong>Tunable, with a record.</strong> Thresholds and weights are editable on the page, an auto-calibration sets them from the account’s own post-signal drawdowns, and a pure-slope tool checks any pasted net-value column in seconds.</span><span class="result-line"><strong>Watch before act.</strong> Observation and reduction are separate levels, and the monitor never prescribes a position size; it tells the desk when to look.</span>'
      ],
      [
        '05 · What stays private',
        'The platform was calibrated on the desk’s own history and the monitor on live account histories my supervisor supplied; both the code and those series stay with the firm, so this page describes the method and not the figures. The monitor is a backtest and alerting tool, not a trading recommendation: its thresholds reflect the accounts it was calibrated on and should be re-set as the desk’s history grows. The factor results are relative statements about which signals helped on this universe, not forecasts.'
      ],
      [
        '06 · What I took from the summer',
        'Two lessons, one from each system. On the platform, an equal-weight vote of all eight factors trailed the best single factor in every sector. Working out why, through cross-factor correlations, alternative weights and orthogonalization, taught me to ask what a factor measures, what it assumes and what it adds before trusting its backtest. On the monitor, the useful signal was never the level of net value but the change in its slope: an account that is still rising can already be slowing, and that is the moment to look. Building a tool that other people would act on also taught me to label what was verified and what was not, and to keep the “watch” level separate from the “act” level so that an alert is a reason to think, not an instruction.'
      ]
    ],
  },
  /* Olist: numbers from the repository's saved E1 results (outputs/e1/posthoc/posthoc_v.json,
     outputs/e1/score_verification.csv, docs/STAGE7_DATE_POLICY.md, docs/manager_handoff.md,
     docs/E1_DECISIONS.md). Loss 23.76 -> 15.61 is the 34% cut; coverage 0.655 -> 0.914 on the same
     12,045 orders; pinball 1.417 vs 1.324 unshifted is the 6.5% gap; AP 0.123 vs a 0.043 late rate
     is the 2.9x; state rule 21.4 vs Olist 24.4 days is the 12%. Improvements under 6% are left out. */
  'olist-delivery-promises': {
    title: 'Promised Delivery Dates on Olist',
    subtitle: 'When is a matched comparison still unequal?',
    headline: 'How many days should a shop promise, and does a better forecast promise fewer?',
    tagline: 'A promised delivery date trades late arrivals against spare days. I derive the loss-minimising whole-day promise as a quantile of delivery time, calibrate it so the promised coverage holds, and then test, under a pre-registered design, whether a model with lower forecast loss actually promises fewer days at the same reliability. On public Olist orders from Brazil, it did not.',
    chips: ['Python', 'pandas', 'scikit-learn', 'DuckDB', 'Quantile regression', 'Conformal calibration', 'pytest'],
    screenshot: 'images/olist-delivery-diagnostics.jpg',
    screenshotSize: [1280, 800],
    screenshotAlt: 'The project site, overview page: four questions, from which orders to check first to the mathematics of the promise, with the top-10% picks catching 34.2% of late orders in the monthly-refit view',
    dashboard: 'https://suzanneisgenius.github.io/olist-delivery-promises/',
    metrics: [
      { label: 'Expected loss, quantile promise vs mean', value: '34% lower', note: 'Whole-day promise at a 90% target, equivalent to a 9:1 late-to-early cost ratio; 12,045 validation orders.' },
      { label: 'On-time coverage, mean vs quantile', value: '65.5% → 91.4%', note: 'Share of orders arriving by the promised day, same 12,045 orders.' },
      { label: 'Late orders caught by the top 10% of risk picks', value: '30.5%', note: '2.9× a random pick with the same weekly budget; ROC AUC 0.761. Time-split, labels used only once delivered.' },
      { label: 'Promised delivery window vs Olist’s own estimate', value: '12% shorter', note: '24.4 → 21.4 days, 3.0 days fewer under the per-state quantile rule, at coverage within the registered tolerance. Purchases April to July 2018.' },
    ],
    sections: [
      [
        '01 · Question',
        'Two decisions sit behind a delivery promise: which orders to check first, and how many days to promise. The second is the main study. Under an asymmetric linear loss the best whole-day promise is a quantile of delivery time, so a 90% target is the same decision as pricing a late day at nine times a spare day. The question is then whether a model with lower forecast loss turns that advantage into fewer promised days at the same coverage.'
      ],
      [
        '02 · Data',
        'Public Olist e-commerce orders, Brazil, 2017 to 2018, restricted to delivered single-seller orders. Three disjoint periods: 12,045 validation orders for the quantile-versus-mean comparison, 17,056 orders from October to December 2017 for calibration, and 19,950 orders from April to July 2018 for the pre-registered evaluation, scored once. Labels are used only once an order is delivered, so nothing at purchase time sees the future. The evaluation orders had been looked at earlier in the project, so this is pre-registered exploratory work, not a blind test.'
      ],
      [
        '03 · Methods',
        'Three policies set a whole-day promise at a 90% target: a per-state quantile rule, a linear quantile regression and shallow gradient boosting. Each is calibrated with a split-conformal-style shift on the calibration orders, frozen, then scored once on the evaluation orders. For integer outcomes I show that Y ≤ U holds exactly when Y ≤ ⌊U⌋, so rounding a continuous bound down loses no coverage. The regression-versus-rule comparison is matched on the same orders, and an additive decomposition splits any day gap into prediction, calibration and rounding. A separate logistic model ranks orders by late risk at purchase time, with time-split evaluation and no future labels.'
      ],
      [
        '04 · Results',
        '<span class="result-line"><strong>Quantile versus mean.</strong> On 12,045 validation orders the 90% quantile promise cut expected loss by <strong>34%</strong> against promising the mean and raised on-time coverage from <strong>65.5% to 91.4%</strong>.</span><span class="result-line"><strong>Rounding.</strong> Rounding the calibrated bound down instead of up shortened every continuous-model promise by one day with no loss of coverage, and widened gradient boosting’s lead over the state rule from 0.32 to 1.32 days, past the one-day bar. Post hoc, so it does not replace the registered result.</span><span class="result-line"><strong>Matched comparison.</strong> Matching the regression-versus-rule comparison moved the gap by 4.11 days and reversed the earlier verdict. Gradient boosting had <strong>6.5% lower</strong> pre-calibration pinball loss than the linear model yet promised 1.22 more days: +0.90 from prediction, +0.31 from calibration, and about zero from rounding. The two frozen policies reached 97.1% and 96.2% coverage, so they were never at the same reliability.</span><span class="result-line"><strong>Late-risk ranking.</strong> The top 10% of each week’s orders by risk held <strong>30.5%</strong> of late deliveries, <strong>2.9×</strong> a random pick with the same budget (ROC AUC 0.761).</span><span class="result-line"><strong>Against Olist’s own date.</strong> The per-state quantile rule promised 3.0 days, or <strong>12%</strong>, less than Olist’s estimate, at coverage within the registered tolerance.</span><span class="case-note">Every reported number is recomputed from the saved per-order files by a check script; the freeze record and config hashes are in the repository.</span>'
      ],
      [
        '05 · What the analysis cannot show',
        'Every calibrated policy over-covered the evaluation period, reaching 96% to 97% for a 90% target. Changing delivery times, the cohort filter on Olist’s estimated date and order mix could each explain it, and the study does not separate them. There is one evaluation period, so whether rounding down or recalibration would hold up in a new period is untested, and the results cover delivered single-seller orders only. The risk ranking shows which orders to look at first; measuring prevented delays would need an intervention study.'
      ],
      [
        '06 · Reflection',
        'Lower loss did not mean a shorter promise. The gap came from how the calibration shift carried from one period to the next, which no loss metric on the training period could show. I learned to compare policies at matched reliability, to register the comparison before scoring, and to write the rounding rule down as a proof rather than a convention.'
      ]
    ],
  },
  'health-dashboard': {
    title: 'Malaria Prevention & Child Mortality',
    headline: 'Who uses bed nets, and what do country-level data show?',
    tagline: 'This project examines who uses insecticide-treated nets, what country-level mortality data can tell us about their use, and whether ITN use improves prediction.',
    contribution: "I led the three-person course team. I proposed the research question and the main arguments, carried out the analysis, and wrote the introduction, the narrative and the world map. For the later reanalysis, I wrote the specifications and reviewed the results.",
    chips: ['Python', 'statsmodels', 'scikit-learn', 'Cross-validation', 'Interactive maps'],
    screenshot: 'images/malaria-overview-v3_8_4.jpg',
    screenshotSize: [1280, 803],
    screenshotAlt: 'Our v3.8.4 dashboard overview with seven sections and an interactive ITN-use map',
    dashboard: 'malaria_dashboard_v3_8_4.html',
    metrics: [
      { label: 'Countries with poorest > richest ITN use', value: '28/45', note: 'Children’s ITN use in each country’s latest survey.' },
      { label: 'Adjusted country-level estimate', value: '−0.43%', note: 'Per 10-percentage-point higher children’s ITN use. Relative mortality difference; 95% CI −7.1% to +6.7%.' },
      { label: 'Across 13 comparisons', value: 'No clear prediction improvement', statement: true, note: 'Under the conditional resampling check; this does not establish no effect.' },
      { label: 'DHS surveys', value: '159', note: 'Surveys with wealth-group estimates.' },
    ],
    sections: [
      [
            "01 · Question",
            "The later reanalysis examines ITN coverage, adjusted associations with under-five mortality, and prediction for countries held out from training."
      ],
      [
            "02 · Data",
            "The later reanalysis used frozen snapshots from the World Bank, DHS Program and Malaria Atlas Project: a 63-country cross-section, a 40-country African annual panel (2000–2023), and 159 DHS surveys with wealth-group estimates. Children’s ITN use in the cross-section was kept separate from estimated whole-population use in the panel. In the source audit, 57 of 63 national ITN-use values matched the official snapshot; the other six were standardised to it."
      ],
      [
            "03 · Methods",
            "The later reanalysis used adjusted regression to compare countries and fixed-effects models to examine changes within countries over time. Ridge and random forests were evaluated on held-out countries, with missing-value handling and tuning restricted to training folds. Later-year checks and simple baselines provided additional comparisons."
      ],
      [
            "04 · System Design",
            "<strong>Source snapshots → cleaned tables → model results → an interactive dashboard.</strong> A reproducible Python pipeline feeds one offline HTML file, with maps, wealth-group comparisons, validation designs, methods and limitations."
      ],
      [
            "05 · Results",
            "<span class=\"result-line\"><strong>Coverage.</strong> Children’s ITN use was higher in the poorest than the richest wealth group in <strong>28 of 45 countries</strong>, using each country’s latest available survey.</span><span class=\"result-line\"><strong>Association.</strong> Across 63 countries, the adjusted country-level estimate was a <strong>−0.43% relative mortality difference per 10-percentage-point higher children’s ITN use</strong> (95% CI −7.1% to +6.7%). The interval includes zero, so the evidence remains inconclusive.</span><span class=\"result-line\"><strong>Prediction.</strong> Adding ITN reduced point-estimate error in <strong>4 of 13 comparisons</strong>, but none showed a clear improvement under the conditional resampling check.</span><span class=\"result-line\"><strong>Precision.</strong> Holding the design and estimated standard error fixed, the approximate 80%-power threshold was <strong>9.2% lower or 10.1% higher</strong> mortality per 10-point increase in ITN use. This check does not rule out smaller associations.</span><span class=\"case-note\">Prediction ranges use saved held-out errors and exclude refitting, tuning and measurement uncertainty. The model comparisons share countries.</span>"
      ],
      [
            "06 · Reflection",
            "I learned to keep coverage, association and prediction separate. Country-level, all-cause mortality data cannot establish individual protection or a causal effect. An interval that includes zero is not proof of no association. Studying individual protection would require individual-level data and a suitable study design."
      ]
],
  },
  'bankroll-risk': {
    /* Copy synced 2026-11-03 from the Cyber Data Lab r8 release (CHANGES.md of 2026-11-02/03).
       Every number comes from poker-risk-lab commit 7b35a0a: case-study/index.html (built from
       reports/case-study/*.json), README.md (6.76% / 7.12% / 7.17%, s.e. 0.08) and
       checks/engine-agreement/results.json (7.13% / 7.08%). The r7 figures (7.2%, 37.4%, 27.3%,
       1.44×, Markov 0.068) have no saved result in the current repo and are gone. */
    title: 'Poker Risk Lab',
    subtitle: 'Where a simulated risk estimate can go wrong',
    headline: 'How much should we trust a simulated risk estimate?',
    tagline: 'Poker bankrolls are my test case for a general question in simulation: how much of the error in a risk estimate can more computing remove? A Python research engine produces the saved results, and the web app reruns scenarios on its server.',
    chips: ['Python', 'NumPy', 'SciPy', 'Node.js', 'Monte Carlo', 'Bayesian inference', 'Numerical validation'],
    screenshot: 'images/poker-risk-lab-app.jpg',
    screenshotSize: [1280, 800],
    screenshotAlt: 'Risk Lab in the live app, Positive edge scenario (the reference case): 6.3% risk of hitting zero from 2,000 paths, 95% interval 5.4% to 7.5%, beside simulated bankroll paths',
    metrics: [
      { label: 'Exact model risk', value: '7.17%', note: 'Reference case: 30 buy-ins, +3 bb/100, 90 bb/100 swings, 100,000 hands.' },
      { label: 'Simulation noise', value: '±1.13 pts', note: '95% range for a single 2,000-path run, the app’s default size.' },
      { label: 'Uncertain win rate', value: '0.1%–83.3%', note: '95% interval for the risk after 50,000 hands at +3 bb/100.' },
      { label: 'Five return models', value: '6.4%–20.3%', note: 'Risk under five models of how results arrive, same edge.' },
    ],
    strands: [
      { tag: 'STRAND 01 · NUMERICS', title: 'Missed crossings and the Brownian-bridge correction',
        body: 'If ruin is checked only every 100 hands, a path can drop below zero and recover between checks without being counted. Across 40 seeds of 2,000 paths, checkpoints alone gave 6.76%. With a Brownian-bridge crossing correction the mean was 7.12% (s.e. 0.08 points), close to the exact 7.17%, and the correction raised the estimate on every seed.' },
      { tag: 'STRAND 02 · MC ERROR', title: 'Simulation noise and interval coverage',
        body: 'I reran the same scenario with 40 seeds at 500, 2,000 and 20,000 paths. The 95% interval reported by each run contained the exact value in 38, 38 and 39 of the 40 runs, in line with the 38 you would expect. More paths make this interval narrower, but they do nothing about the other two sources of error.' },
      { tag: 'STRAND 03 · UNCERTAINTY', title: 'Win-rate uncertainty and priors from real hands',
        body: 'A win rate is only ever estimated, so instead of plugging in one number I push its posterior through the risk formula. After 50,000 hands averaging +3 bb/100, a weak N(0, 10²) prior gives a 95% interval for the risk of 0.1% to 83.3%. Priors fitted to real $2/$4 hands (HandHQ logs, July 2009) matter most early on: after 10,000 hands the median risk is 8.7% with the regulars’ prior and 23.0% with the all-players prior. By 1,000,000 hands the priors agree, with average risk between 8.0% and 8.5%.' },
      { tag: 'STRAND 04 · ROBUSTNESS', title: 'Stress tests and the long-run spread',
        body: 'With the edge held fixed, heavy tails and rare shocks barely change the risk (6.4% and 7.3%, against 7.0% for the baseline). Letting swings carry over from one 100-hand block to the next raises it to 20.3%. Matching the long-run spread brings it back near the baseline, and the Brownian formula with each model’s long-run spread predicts the simulated value (21.2% against 20.3%). Real hands turned out only mildly heavy-tailed (Student-t, 7.0 degrees of freedom) with no carry-over (correlation −0.002), and the fitted model gives 6.7%.' },
    ],
    validation: {
      caption: 'Five estimates of one ruin probability (30 buy-ins, +3 bb/100, 90 bb/100 swings, 100,000 hands).',
      rows: [
        { m: 'Brownian first-passage formula (exact for this model)', v: '7.17%', ci: '' },
        { m: 'Web engine (JavaScript), 200,000 paths with bridge correction', v: '7.13%', ci: '' },
        { m: 'Research engine (Python), 200,000 paths with bridge correction', v: '7.08%', ci: '' },
        { m: 'Mean of 40 seeds × 2,000 paths with bridge correction', v: '7.12%', ci: 's.e. 0.08 pts' },
        { m: 'Same 40 seeds, ruin checked only every 100 hands', v: '6.76%', ci: 'misses crossings' },
      ],
    },
    sections: [
      ['01 · Research Question', 'A simulated ruin probability can be wrong for three different reasons: simulation noise, an uncertain win rate, or the wrong model of how results arrive. I measure each one separately on a poker bankroll, which is a concrete absorbing-boundary problem, and check which of them more computing can fix.'],
      ['02 · Data & Model', 'The reference scenario is a 30-buy-in (3,000 bb) bankroll with a +3 bb/100 win rate, 90 bb/100 volatility and a 100,000-hand horizon, and ruin at zero. In the baseline model, 100-hand results are independent and Normal; for this model the finite-horizon Brownian first-passage formula gives the exact risk. Real hands are used in two places: the spread of win rates across players, and the shape and carry-over of 100-hand results. Both are fitted to PartyPoker and Ongame $2/$4 no-limit hold’em logs from July 2009 (PHH dataset, CC BY 4.0). The repository keeps only aggregate results, not the hands.'],
      ['03 · Methodology', 'Each part of the study isolates one source of error. Simulation error is measured with repeated runs, interval coverage and the Brownian-bridge correction. For the win rate, 20,000 draws from a Normal posterior go through the risk formula, once under a weak prior and once under priors fitted to real hands. For the model, five ways results might arrive at the same edge (baseline, heavy tails, rare shocks, carry-over and clustered regimes) are simulated with 40,000 paths each. The saved results come from the Python research engine; the web app runs a separate JavaScript engine on its server.'],
      ['04 · Validation', 'With continuous monitoring, the Brownian formula is exact for the baseline model, so simulation error can be measured directly against it. The web and research engines are separate code with different random-number generators, and at 200,000 paths each they agree within one standard error. Hand evaluation and equity are checked against PokerKit, an independent open-source library. These checks show that the code computes the model correctly. Whether the model fits real games is a separate question, which the stress tests and real-hand fits take up.'],
      ['05 · Findings', 'For the reference scenario the exact model risk is 7.17%, and a single 2,000-path run falls within ±1.13 points of it 95% of the time. An uncertain win rate after 50,000 hands leaves anything from 0.1% to 83.3% plausible, and five models of how results arrive give 6.4% to 20.3%. Of these three, only the first gets smaller with more computing. Keeping them apart also helped when an engine update moved the same seed from 7.85% to 6.35%: changing one thing at a time showed that the drop came from the new random numbers, while the bridge correction on its own raised the risk on every seed.'],
      ['06 · Reflection', 'Poker is a small example of a common problem in applied statistics. To defend one risk number, I had to check the numerics, the sampling error, the uncertainty in the inputs and the form of the model, and settling one of them did not settle the others. I expect that habit to carry over to risk estimates outside poker.'],
    ],
  },
};
