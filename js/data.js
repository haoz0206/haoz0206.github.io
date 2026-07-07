/* =============================================================================
 * data.js — single source of truth for the site.
 * To update the page, edit ONLY this file (no HTML changes needed):
 *   - profile : name, tagline, links, CV path
 *   - news    : add an item to the TOP of the array
 *   - pubs    : add / edit / reorder publications
 *
 * Publication fields:
 *   title    (string)            required
 *   authors  (string)            put your name exactly as "Hao Zhong" -> auto-bolded
 *   venue    (string)            e.g. "NeurIPS 2025"
 *   tag      (string)            short badge label, e.g. "Poster"
 *   year     (number)            used for sorting/labels
 *   img      (string | null)     path under assets/img/; null -> auto placeholder
 *   links    ({label:url})       e.g. { arXiv:"...", Code:"...", Project:"..." }
 *   selected (boolean)           true -> shown under "Selected"; highlighted
 *   note     (string)            optional small grey note (e.g. author position)
 *   confirm  (boolean)           true -> renders a "details to confirm" marker
 * ===========================================================================*/

const DATA = {
  profile: {
    name: "Hao Zhong",
    zh: "钟浩",
    tagline: "PhD Student · Multimodal Reasoning & Reinforcement Learning",
    affiliation:
      "State Key Lab of CAD&CG, Zhejiang University",
    location: "Hangzhou, China",
    avatar: "assets/img/avatar.svg", // TODO: replace with a real headshot (square)
    cv: "assets/haoz_cv.pdf",
    links: {
      Email: "mailto:haoz0206@zju.edu.cn",
      GitHub: "https://github.com/haoz0206",
      "Google Scholar": "https://scholar.google.com/citations?user=TnwXIMQAAAAJ",
    },
  },

  about: [
    "I work on <strong>multimodal alignment, perception, and reasoning</strong>, with a recent focus on <strong>multimodal reinforcement learning</strong> for language models and scalable RL infrastructure.",
    "I am increasingly interested in grounding vision-language understanding gained from large-scale pretraining in physical-world interaction, particularly through <strong>vision-language-action (VLA)</strong> models and <strong>world-action models (WAM)</strong>.",
    "I am a PhD student at the State Key Lab of CAD&amp;CG, Zhejiang University, advised by Prof. <a href=\"https://cshen.github.io\">Chunhua Shen</a> and Research Prof. <a href=\"https://stan-haochen.github.io\">Hao Chen</a>.",
  ],

  news: [
    { date: "May 2026", html: "<em>ACTIVE-o3</em> accepted to <strong>ICML 2026</strong>." },
    { date: "Feb 2026", html: "Two more papers accepted to <strong>CVPR 2026</strong>: <em>Exploring Spatial Intelligence from a Generative Perspective</em> and <em>Preserving Source Video Realism</em>." },
    { date: "Feb 2026", html: "<em>Eliciting Complex Spatial Reasoning through Wide-Baseline Matching</em> accepted to <strong>CVPR 2026</strong>." },
    { date: "Feb 2026", html: "<strong>LLaDA 2.1</strong> technical report is out — I contributed to its post-training development." },
    { date: "Sep 2025", html: "<em>Omni-R1</em> accepted to <strong>NeurIPS 2025</strong> as a poster." },
  ],

  // Ordered newest-first. `selected: true` items are highlighted.
  // Author lists & positions verified against arXiv / project pages (Jul 2026).
  pubs: [
    {
      title: "Eliciting Complex Spatial Reasoning in MLLMs through Wide-Baseline Matching",
      authors: "Hao Zhong, Muzhi Zhu, Shenyan Zeng, Anzhou Li, Cong Chen, Hua Geng, Duochao Shi, Wentao Ye, Tao Lin, Hao Chen, Chunhua Shen",
      venue: "CVPR 2026", tag: "Poster", year: 2026, selected: true,
      links: { Code: "https://github.com/aim-uofa/ReasonMatch" },
    },
    {
      title: "Exploring Spatial Intelligence from a Generative Perspective",
      authors: "Muzhi Zhu, Shunyao Jiang, Huanyi Zheng, Zekai Luo, Hao Zhong, Anzhou Li, Kaijun Wang, Jintao Rong, Yang Liu, Hao Chen, Tao Lin, Chunhua Shen",
      venue: "CVPR 2026", tag: "", year: 2026, selected: false,
      links: { arXiv: "https://arxiv.org/abs/2604.20570" },
    },
    {
      title: "Preserving Source Video Realism: High-Fidelity Face Swapping for Cinematic Quality",
      authors: "Zekai Luo, Zongze Du, Zhouhang Zhu, Hao Zhong, Muzhi Zhu, Wen Wang, Yuling Xi, Chenchen Jing, Hao Chen, Chunhua Shen",
      venue: "CVPR 2026", tag: "", year: 2026, selected: false,
      links: { arXiv: "https://arxiv.org/abs/2512.07951", Project: "https://aim-uofa.github.io/LivingSwap/" },
    },
    {
      title: "OmniJigsaw: Enhancing Omni-Modal Reasoning via Modality-Orchestrated Reordering",
      authors: "Yiduo Jia, Muzhi Zhu, Hao Zhong, Mingyu Liu, Yuling Xi, Hao Chen, Bin Qin, Yongjie Yang, Zhenbo Luo, Chunhua Shen",
      venue: "2026", tag: "Preprint", year: 2026, selected: false,
      links: { arXiv: "https://arxiv.org/abs/2604.08209" },
    },
    {
      title: "LLaDA 2.1: Speeding Up Text Diffusion via Token Editing",
      authors: "Tiwei Bie, Maasong Cao, Xiang Cao, et al. (Hao Zhong among authors)",
      venue: "2026", tag: "Tech Report", year: 2026, selected: false,
      links: {},
    },
    {
      title: "NoTVLA: Semantics-Preserving Robot Adaptation via Narrative Action Interfaces",
      authors: "Zheng Huang, Mingyu Liu, Xiaoyi Lin, Muzhi Zhu, Canyu Zhao, Zongze Du, Ye Lin, Xiaoman Li, Yiduo Jia, Hao Zhong, Hao Chen, Chunhua Shen",
      venue: "2025", tag: "Preprint", year: 2025, selected: false,
      links: { arXiv: "https://arxiv.org/abs/2510.03895" },
    },
    {
      title: "GUI-Shepherd: Reliable Process Reward and Verification for Long-Sequence GUI Tasks",
      authors: "Cong Chen, Kaixiang Ji, Hao Zhong, Muzhi Zhu, Anzhou Li, Guo Gan, Ziyuan Huang, Cheng Zou, Jiajia Liu, Jingdong Chen, Hao Chen, Chunhua Shen",
      venue: "2025", tag: "Preprint", year: 2025, selected: false,
      links: { arXiv: "https://arxiv.org/abs/2509.23738" },
    },
    {
      title: "Omni-R1: Reinforcement Learning for Omnimodal Reasoning via Two-System Collaboration",
      authors: "Hao Zhong, Muzhi Zhu, Zongze Du, Zheng Huang, Canyu Zhao, Mingyu Liu, Wen Wang, Hao Chen, Chunhua Shen",
      venue: "NeurIPS 2025", tag: "Poster", year: 2025, selected: true,
      links: { arXiv: "https://arxiv.org/abs/2505.20256", Code: "https://github.com/aim-uofa/Omni-R1", Project: "https://aim-uofa.github.io/OmniR1/" },
    },
    {
      title: "ACTIVE-o3: Empowering MLLMs with Active Perception via Pure Reinforcement Learning",
      authors: "Muzhi Zhu, Hao Zhong, Canyu Zhao, Zongze Du, Zheng Huang, Mingyu Liu, Hao Chen, Cheng Zou, Jingdong Chen, Ming Yang, Chunhua Shen",
      venue: "ICML 2026", tag: "Poster", year: 2025, selected: true,
      links: { arXiv: "https://arxiv.org/abs/2505.21457", Code: "https://github.com/aim-uofa/Active-o3", Project: "https://aim-uofa.github.io/ACTIVE-o3/" },
    },
  ],

  education: [
    { role: "PhD student, Computer Science and Technology", org: "State Key Lab of CAD&CG, Zhejiang University", place: "Hangzhou, CN",
      period: "Sep 2024 – present",
      detail: "Advised by Prof. Chunhua Shen and Research Prof. Hao Chen." },
    { role: "BS, Computer Science and Technology", org: "Zhejiang University", place: "Hangzhou, CN",
      period: "Sep 2020 – Jun 2024",
      detail: "GPA: 3.84 / 4.00." },
  ],
};
