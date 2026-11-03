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

  'quant-platform': {
    title: 'Multi-Factor Quant Strategy Research Platform',
    headline: 'A model is only useful if its assumptions survive review.',
    tagline: 'A systematic research framework for feature engineering, backtesting, validation, and risk-aware evaluation on financial time-series data.',
    chips: ['Python', 'Pandas', 'NumPy', 'Validation'],
        sections: [
      ['01 · Project Mission', 'How can testable trading signals be constructed from financial time series, and how do we know a backtest result means anything?'],
      ['02 · Data & System Input', 'Prices, returns, volume, fundamental indicators, industry classification across a multi-year futures sample.'],
      ['03 · Methodology', 'Momentum, volatility, valuation and quality factor construction; cross-sectional standardization; signal combination; portfolio construction.'],
      ['04 · System Design', 'Rebalancing frequency, trading rules, and transaction-cost assumptions define the backtest contract.'],
      ['05 · Results', 'Cumulative return and drawdown profiles across factor blends; every number regenerates from code.'],
      ['06 · Reflection', 'Overfitting, data leakage, transaction costs and out-of-sample validation are treated as first-class concerns.'],
    ],
  },
  'health-dashboard': {
    title: 'Malaria Prevention & Child Mortality',
    headline: 'Who uses bed nets, and what do country-level data show?',
    tagline: 'This project examines who uses insecticide-treated nets, what country-level mortality data can tell us about their use, and whether ITN use improves prediction.',
    contribution: "In the original three-person course project, I was responsible for the introduction, narrative and world map. For the later reanalysis, I supplied written specifications and review notes.",
    chips: ['Python', 'statsmodels', 'scikit-learn', 'Cross-validation', 'Interactive maps'],
    screenshot: 'images/malaria-overview-v3_8_4.jpg',
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
    title: 'Bankroll Risk Lab',
    subtitle: 'Poker bankroll as a case study in absorbing-boundary risk',
    headline: 'How reliable is a risk estimate when the model, the data, and the numerics are all imperfect?',
    tagline: 'A study of ruin probability under an absorbing boundary — quantifying how much a headline risk number moves once barrier resolution, Monte Carlo error, parameter uncertainty, and model misspecification are each taken seriously.',
    chips: ['Python', 'NumPy', 'SciPy', 'Monte Carlo', 'Bayesian inference', 'Numerical validation'],
    metrics: [
      { label: 'Base-model risk', value: '7.2%', note: 'Fixed assumptions; separate from the uncertainty case.' },
      { label: 'Base-model 95% CI', value: '[6.6%, 7.7%]', note: 'Interval for the 7.2% simulation estimate.' },
      { label: 'Separate uncertainty case', value: '37.4%', note: 'Posterior-averaged risk; the plug-in risk in this same case is 27.3%.' },
      { label: 'Paths Simulated', value: '2.0M' },
    ],
    strands: [
      { tag: 'STRAND 01 · NUMERICS', title: 'Barrier resolution & the Brownian-bridge correction',
        body: 'A discrete step size lets a path cross the ruin boundary and recover between observations, biasing risk downward. At step = 500 hands the estimate understates ruin by 8.2%; adding a Brownian-bridge crossing correction cuts the discretization error to under 1%.' },
      { tag: 'STRAND 02 · MC ERROR', title: 'Monte Carlo convergence & coverage',
        body: 'Estimator error scales as the log-log slope of −0.55 ± 0.03, matching the O(N^-1/2) rate expected of Monte Carlo. Bootstrap confidence intervals are checked for nominal coverage rather than assumed.' },
      { tag: 'STRAND 03 · UNCERTAINTY', title: 'Bayesian propagation of parameter uncertainty',
        body: 'In a separate synthetic-history case, 50,000 hands give an estimated win rate of 1.86 bb/100 and volatility of 89.0 bb/100. With a 2,000 bb bankroll, a 100,000-hand horizon and ruin at zero, plug-in risk is 27.3%; posterior-averaged risk is 37.4% (×1.37). This comparison includes prior shrinkage: risk at the posterior-mean win rate is 30.2%, before averaging over win-rate uncertainty. Volatility stays fixed. These figures are separate from the 7.2% base model.' },
      { tag: 'STRAND 04 · ROBUSTNESS', title: 'Model-misspecification stress tests',
        body: 'The i.i.d.-Normal assumption is deliberately broken. Serial correlation (AR(1)) inflates ruin by 1.44×; a regime-switching volatility model by 1.20×. The headline number is reported alongside how far it moves under each violation.' },
    ],
    validation: {
      caption: 'Four independent estimates of ruin probability — agreement is the evidence the engine is correct.',
      rows: [
        { m: 'Monte Carlo — 2.0M paths (95% CI)', v: '0.072', ci: '[0.066, 0.077]' },
        { m: 'Brownian bridge — finite horizon', v: '0.072', ci: '' },
        { m: 'Brownian motion — infinite horizon', v: '0.108', ci: '' },
        { m: 'Markov chain — absorption probability', v: '0.068', ci: '' },
      ],
    },
    sections: [
      ['01 · Research Question', 'A ruin probability is only as trustworthy as the weakest link behind it. This project treats one concrete absorbing-boundary problem — a poker bankroll — as a testbed for a general question: how much does a headline risk estimate change once the numerical scheme, the finite sample, the parameter uncertainty, and the model form are each stress-tested?'],
      ['02 · Data & Model', 'No real player records are used. The base-model benchmark uses a 3 bb/100 win rate, 90 bb/100 volatility, a 30-buy-in bankroll and a 100,000-hand horizon. A separate uncertainty case estimates the win rate from 50,000 synthetic hands, then models a 2,000 bb bankroll over the next 100,000 hands. Both use an absorbing boundary at zero. The uncertainty case uses a Normal prior with mean 0 and standard deviation 10 bb/100, an autocorrelation-adjusted estimation error and 20,000 posterior draws; estimated volatility is held fixed.'],
      ['03 · Methodology', 'Four strands, each isolating one source of error: barrier-resolution bias and its Brownian-bridge correction; Monte Carlo convergence and interval coverage; Bayesian propagation of parameter uncertainty; and misspecification stress tests. Results are cross-validated against a Brownian first-passage solution and a Markov-chain absorption model.'],
      ['04 · Validation', 'Monte Carlo, Brownian bridge (finite horizon) and the Markov chain agree at ~0.07; the infinite-horizon Brownian approximation sits higher at 0.108, exactly as its assumptions predict. Agreement across independent methods — and understanding the one principled disagreement — is the credibility core.'],
      ['05 · Findings', 'Base-model benchmark: 7.2% ruin risk (95% CI 6.6%–7.7%) under fixed assumptions. Separate synthetic-history case: 27.3% plug-in risk versus 37.4% posterior-averaged risk (×1.37), including both prior shrinkage and win-rate uncertainty. Its 95% posterior interval for conditional risk is wide: 0.9%–97.3%. These are two different scenarios, not a rise from 7.2% to 37.4%. Separate model stress tests show up to 1.44× higher risk under serial correlation.'],
      ['06 · Reflection', 'The exercise is a small model of a large problem in applied statistics: a defensible estimate requires auditing the numerics, the sampling error, the estimation uncertainty, and the model form together, not one at a time. That discipline is the transferable result.'],
    ],
  },
};
