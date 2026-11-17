import type { Locale } from "@/lib/i18n"

export type OnboardingCopy = {
  eyebrow: string
  title: string
  lede: string
  settingsEyebrow: string
  settingsTitle: string
  settingsLede: string
  stepOf: string
  steps: [string, string, string, string]
  who: { title: string; lede: string; handle: string; handleHint: string; handleTaken: string; handleFree: string; handleInvalid: string; name: string; namePlaceholder: string; fromGithub: string }
  where: { title: string; lede: string; from: string; based: string; sameAsOrigin: string; search: string; popular: string; cities: string; countries: string; useTyped: string; country: string; clear: string; noMatch: string; pickCountry: string }
  work: { title: string; lede: string; role: string; rolePlaceholder: string; bio: string; bioPlaceholder: string; openTo: string; openToPlaceholder: string; openToHint: string; jobSeeking: string; jobSeekingHint: string; remove: string; suggestions: string[] }
  links: { title: string; lede: string; more: string; github: string; linkedin: string; x: string; instagram: string; gitlab: string; website: string; website2: string; websitePlaceholder: string; userPlaceholder: string }
  nav: { next: string; back: string; skip: string; finish: string; saving: string; required: string; sessionExpired: string; saveFailed: string; salaryTogether: string }
  agent: { toggle: string; title: string; body: string; copy: string; copied: string }
  settings: { public: string; location: string; work: string; links: string; save: string; saved: string; privateEyebrow: string; privateTitle: string; privateBody: string; salaryMin: string; salaryMax: string; currency: string; openToArrangements: string; remote: string; onsite: string; hybrid: string; onsiteCity: string; resume: string; agentTitle: string; agentBody: string }
  loading: string
}


export const onboardingCopy: Record<Locale, OnboardingCopy> = {
  en: {
    eyebrow: "Crafter profile",
    title: "Let's set you up.",
    lede: "Two things are required. Everything else can wait.",
    settingsEyebrow: "Profile settings",
    settingsTitle: "Update how you show up.",
    settingsLede: "Keep your work, links and availability current.",
    stepOf: "Step {n} of {total}",
    steps: ["You", "Places", "Work", "Links"],
    who: { title: "Who are you?", lede: "Your handle is how people find you and what you ship under.", handle: "Handle", handleHint: "Letters, numbers and hyphens. 3 to 40 characters.", handleTaken: "That handle is taken.", handleFree: "Available", handleInvalid: "Use lowercase letters, numbers and inner hyphens.", name: "Name", namePlaceholder: "Ada Lovelace", fromGithub: "Filled in from your GitHub. Change anything." },
    where: { title: "Where are you?", lede: "Search a city. We fill in the country.", from: "From", based: "Based in", sameAsOrigin: "Same as origin", search: "Search a city or country", popular: "Popular", cities: "Cities", countries: "Countries", useTyped: "Use “{q}”", country: "Country", clear: "Clear", noMatch: "No match. Press Enter to use what you typed.", pickCountry: "Pick its country" },
    work: { title: "What do you do?", lede: "A line or two is plenty.", role: "Current role", rolePlaceholder: "Product designer at Acme", bio: "Short bio", bioPlaceholder: "What you build and what you care about.", openTo: "Roles open to", openToPlaceholder: "Add a role and press Enter", openToHint: "Up to 10.", jobSeeking: "Open to new work", jobSeekingHint: "Adds a badge to your profile.", remove: "Remove", suggestions: ["Frontend", "Backend", "Design", "AI engineer", "Founder"] },
    links: { title: "Where can people find you?", lede: "Add a few links. Usernames are enough.", more: "More links", github: "GitHub", linkedin: "LinkedIn", x: "X", instagram: "Instagram", gitlab: "GitLab", website: "Website", website2: "Second website", websitePlaceholder: "you.com", userPlaceholder: "username" },
    nav: { next: "Continue", back: "Back", skip: "Skip for now", finish: "Create profile", saving: "Saving...", required: "Add a valid handle and a name to continue.", sessionExpired: "Your session expired. Sign in again.", saveFailed: "Could not save your profile.", salaryTogether: "Enter the salary minimum, maximum and currency together." },
    agent: { toggle: "Let your agent fill it", title: "Let your agent fill it", body: "Paste this into Claude Code, Codex or any coding agent. It builds your profile with the Crafter CLI and waits for your OK.", copy: "Copy prompt", copied: "Copied" },
    settings: { public: "Public profile", location: "Places", work: "Work", links: "Links", save: "Save profile", saved: "Your profile has been updated.", privateEyebrow: "Private career preferences", privateTitle: "Help the right partners find you.", privateBody: "Hidden from your public profile and shared only with trusted partners.", salaryMin: "Salary minimum", salaryMax: "Salary maximum", currency: "Currency", openToArrangements: "Open to", remote: "Remote", onsite: "Onsite", hybrid: "Hybrid", onsiteCity: "Onsite city", resume: "Updated resume link", agentTitle: "Update it with your agent", agentBody: "Paste this into your coding agent. It reads your profile, proposes changes and waits for your OK." },
    loading: "Loading your profile",
  },
  es: {
    eyebrow: "Perfil Crafter",
    title: "Armemos tu perfil.",
    lede: "Solo dos datos son obligatorios. Lo demás puede esperar.",
    settingsEyebrow: "Ajustes del perfil",
    settingsTitle: "Actualiza cómo te ven.",
    settingsLede: "Mantén al día tu trabajo, tus enlaces y tu disponibilidad.",
    stepOf: "Paso {n} de {total}",
    steps: ["Tú", "Lugares", "Trabajo", "Enlaces"],
    who: { title: "¿Quién eres?", lede: "Tu handle es cómo te encuentran y con qué publicas.", handle: "Handle", handleHint: "Letras, números y guiones. De 3 a 40 caracteres.", handleTaken: "Ese handle ya está en uso.", handleFree: "Disponible", handleInvalid: "Usa minúsculas, números y guiones internos.", name: "Nombre", namePlaceholder: "Ada Lovelace", fromGithub: "Lo completamos con tu GitHub. Cambia lo que quieras." },
    where: { title: "¿Dónde estás?", lede: "Busca una ciudad. Nosotros ponemos el país.", from: "De", based: "Vives en", sameAsOrigin: "Igual que mi origen", search: "Busca una ciudad o un país", popular: "Populares", cities: "Ciudades", countries: "Países", useTyped: "Usar “{q}”", country: "País", clear: "Quitar", noMatch: "Sin resultados. Pulsa Enter para usar lo que escribiste.", pickCountry: "Elige su país" },
    work: { title: "¿A qué te dedicas?", lede: "Con una o dos líneas basta.", role: "Rol actual", rolePlaceholder: "Diseñadora de producto en Acme", bio: "Bio corta", bioPlaceholder: "Qué construyes y qué te importa.", openTo: "Roles que te interesan", openToPlaceholder: "Escribe un rol y pulsa Enter", openToHint: "Hasta 10.", jobSeeking: "Abierto a nuevo trabajo", jobSeekingHint: "Agrega una insignia a tu perfil.", remove: "Quitar", suggestions: ["Frontend", "Backend", "Diseño", "Ingeniero de IA", "Fundador"] },
    links: { title: "¿Dónde te encuentran?", lede: "Agrega algunos enlaces. Basta con el usuario.", more: "Más enlaces", github: "GitHub", linkedin: "LinkedIn", x: "X", instagram: "Instagram", gitlab: "GitLab", website: "Sitio web", website2: "Segundo sitio", websitePlaceholder: "tu.com", userPlaceholder: "usuario" },
    nav: { next: "Continuar", back: "Atrás", skip: "Omitir por ahora", finish: "Crear perfil", saving: "Guardando...", required: "Agrega un handle válido y un nombre para continuar.", sessionExpired: "Tu sesión expiró. Vuelve a iniciar sesión.", saveFailed: "No se pudo guardar tu perfil.", salaryTogether: "Ingresa juntos el salario mínimo, el máximo y la moneda." },
    agent: { toggle: "Que lo llene tu agente", title: "Que lo llene tu agente", body: "Pega esto en Claude Code, Codex o cualquier agente de código. Arma tu perfil con la CLI de Crafter y espera tu OK.", copy: "Copiar prompt", copied: "Copiado" },
    settings: { public: "Perfil público", location: "Lugares", work: "Trabajo", links: "Enlaces", save: "Guardar perfil", saved: "Tu perfil se actualizó.", privateEyebrow: "Preferencias laborales privadas", privateTitle: "Ayuda a que te encuentren los socios correctos.", privateBody: "No se muestra en tu perfil público y solo se comparte con socios de confianza.", salaryMin: "Salario mínimo", salaryMax: "Salario máximo", currency: "Moneda", openToArrangements: "Abierto a", remote: "Remoto", onsite: "Presencial", hybrid: "Híbrido", onsiteCity: "Ciudad presencial", resume: "Enlace a tu CV actualizado", agentTitle: "Actualízalo con tu agente", agentBody: "Pega esto en tu agente de código. Lee tu perfil, propone cambios y espera tu OK." },
    loading: "Cargando tu perfil",
  },
  pt: {
    eyebrow: "Perfil Crafter",
    title: "Vamos montar seu perfil.",
    lede: "Só duas coisas são obrigatórias. O resto pode esperar.",
    settingsEyebrow: "Configurações do perfil",
    settingsTitle: "Atualize como você aparece.",
    settingsLede: "Mantenha seu trabalho, seus links e sua disponibilidade em dia.",
    stepOf: "Passo {n} de {total}",
    steps: ["Você", "Lugares", "Trabalho", "Links"],
    who: { title: "Quem é você?", lede: "Seu handle é como as pessoas te encontram e com o que você publica.", handle: "Handle", handleHint: "Letras, números e hifens. De 3 a 40 caracteres.", handleTaken: "Esse handle já está em uso.", handleFree: "Disponível", handleInvalid: "Use minúsculas, números e hifens internos.", name: "Nome", namePlaceholder: "Ada Lovelace", fromGithub: "Preenchido com seu GitHub. Mude o que quiser." },
    where: { title: "Onde você está?", lede: "Busque uma cidade. Nós preenchemos o país.", from: "De", based: "Mora em", sameAsOrigin: "Igual à origem", search: "Busque uma cidade ou um país", popular: "Populares", cities: "Cidades", countries: "Países", useTyped: "Usar “{q}”", country: "País", clear: "Limpar", noMatch: "Sem resultados. Aperte Enter para usar o que você digitou.", pickCountry: "Escolha o país" },
    work: { title: "O que você faz?", lede: "Uma ou duas linhas bastam.", role: "Cargo atual", rolePlaceholder: "Designer de produto na Acme", bio: "Bio curta", bioPlaceholder: "O que você constrói e o que te importa.", openTo: "Cargos de interesse", openToPlaceholder: "Digite um cargo e aperte Enter", openToHint: "Até 10.", jobSeeking: "Aberto a novo trabalho", jobSeekingHint: "Adiciona um selo ao seu perfil.", remove: "Remover", suggestions: ["Frontend", "Backend", "Design", "Engenheiro de IA", "Fundador"] },
    links: { title: "Onde te encontrar?", lede: "Adicione alguns links. O usuário já basta.", more: "Mais links", github: "GitHub", linkedin: "LinkedIn", x: "X", instagram: "Instagram", gitlab: "GitLab", website: "Site", website2: "Segundo site", websitePlaceholder: "voce.com", userPlaceholder: "usuário" },
    nav: { next: "Continuar", back: "Voltar", skip: "Pular por agora", finish: "Criar perfil", saving: "Salvando...", required: "Adicione um handle válido e um nome para continuar.", sessionExpired: "Sua sessão expirou. Entre de novo.", saveFailed: "Não foi possível salvar seu perfil.", salaryTogether: "Informe juntos o salário mínimo, o máximo e a moeda." },
    agent: { toggle: "Deixe seu agente preencher", title: "Deixe seu agente preencher", body: "Cole isto no Claude Code, no Codex ou em qualquer agente de código. Ele monta seu perfil com a CLI da Crafter e espera seu OK.", copy: "Copiar prompt", copied: "Copiado" },
    settings: { public: "Perfil público", location: "Lugares", work: "Trabalho", links: "Links", save: "Salvar perfil", saved: "Seu perfil foi atualizado.", privateEyebrow: "Preferências de carreira privadas", privateTitle: "Ajude os parceiros certos a te encontrar.", privateBody: "Fica oculto no perfil público e só é compartilhado com parceiros de confiança.", salaryMin: "Salário mínimo", salaryMax: "Salário máximo", currency: "Moeda", openToArrangements: "Aberto a", remote: "Remoto", onsite: "Presencial", hybrid: "Híbrido", onsiteCity: "Cidade presencial", resume: "Link do currículo atualizado", agentTitle: "Atualize com seu agente", agentBody: "Cole isto no seu agente de código. Ele lê seu perfil, propõe mudanças e espera seu OK." },
    loading: "Carregando seu perfil",
  },
  zh: {
    eyebrow: "Crafter 个人资料",
    title: "来建立你的资料。",
    lede: "只有两项必填，其余都可以稍后再填。",
    settingsEyebrow: "资料设置",
    settingsTitle: "更新你的展示方式。",
    settingsLede: "让你的工作、链接和可用状态保持最新。",
    stepOf: "第 {n} 步，共 {total} 步",
    steps: ["你", "地点", "工作", "链接"],
    who: { title: "你是谁？", lede: "用户名是别人找到你的方式，也是你发布作品时的署名。", handle: "用户名", handleHint: "字母、数字和连字符，3 到 40 个字符。", handleTaken: "这个用户名已被占用。", handleFree: "可用", handleInvalid: "请使用小写字母、数字和中间的连字符。", name: "姓名", namePlaceholder: "Ada Lovelace", fromGithub: "已根据你的 GitHub 填写，可随意修改。" },
    where: { title: "你在哪里？", lede: "搜索城市，国家会自动填好。", from: "来自", based: "现居", sameAsOrigin: "与来自相同", search: "搜索城市或国家", popular: "热门", cities: "城市", countries: "国家", useTyped: "使用“{q}”", country: "国家", clear: "清除", noMatch: "没有匹配项。按 Enter 使用你输入的内容。", pickCountry: "选择所在国家" },
    work: { title: "你做什么？", lede: "一两句话就够了。", role: "当前职位", rolePlaceholder: "Acme 的产品设计师", bio: "简介", bioPlaceholder: "你在做什么，关心什么。", openTo: "感兴趣的职位", openToPlaceholder: "输入职位后按 Enter", openToHint: "最多 10 个。", jobSeeking: "开放新机会", jobSeekingHint: "会在你的资料上显示一个标记。", remove: "移除", suggestions: ["前端", "后端", "设计", "AI 工程师", "创始人"] },
    links: { title: "别人在哪里能找到你？", lede: "添加几个链接，填用户名就行。", more: "更多链接", github: "GitHub", linkedin: "LinkedIn", x: "X", instagram: "Instagram", gitlab: "GitLab", website: "网站", website2: "第二个网站", websitePlaceholder: "you.com", userPlaceholder: "用户名" },
    nav: { next: "继续", back: "返回", skip: "暂时跳过", finish: "创建资料", saving: "保存中...", required: "请填写有效的用户名和姓名后继续。", sessionExpired: "登录已过期，请重新登录。", saveFailed: "无法保存你的资料。", salaryTogether: "请同时填写最低薪资、最高薪资和币种。" },
    agent: { toggle: "让你的智能体来填", title: "让你的智能体来填", body: "把这段粘贴到 Claude Code、Codex 或任何编程智能体。它会用 Crafter CLI 生成你的资料，并等你确认。", copy: "复制提示词", copied: "已复制" },
    settings: { public: "公开资料", location: "地点", work: "工作", links: "链接", save: "保存资料", saved: "你的资料已更新。", privateEyebrow: "私密职业偏好", privateTitle: "帮助合适的合作方找到你。", privateBody: "不会显示在公开资料中，仅与受信任的合作方共享。", salaryMin: "最低薪资", salaryMax: "最高薪资", currency: "币种", openToArrangements: "开放方式", remote: "远程", onsite: "现场", hybrid: "混合", onsiteCity: "现场办公城市", resume: "最新简历链接", agentTitle: "用你的智能体更新", agentBody: "把这段粘贴到你的编程智能体。它会读取你的资料、提出修改，并等你确认。" },
    loading: "正在加载你的资料",
  },
  ja: {
    eyebrow: "Crafter プロフィール",
    title: "プロフィールを作りましょう。",
    lede: "必須は2つだけ。ほかは後で大丈夫です。",
    settingsEyebrow: "プロフィール設定",
    settingsTitle: "見せ方を更新しましょう。",
    settingsLede: "仕事、リンク、稼働状況を最新に保ちます。",
    stepOf: "ステップ {n} / {total}",
    steps: ["あなた", "場所", "仕事", "リンク"],
    who: { title: "あなたは誰ですか？", lede: "ハンドルは、見つけてもらう名前であり、公開時の名義です。", handle: "ハンドル", handleHint: "英数字とハイフン。3〜40文字。", handleTaken: "このハンドルは使われています。", handleFree: "使えます", handleInvalid: "小文字、数字、途中のハイフンを使ってください。", name: "名前", namePlaceholder: "Ada Lovelace", fromGithub: "GitHub から入力しました。自由に変更できます。" },
    where: { title: "どこにいますか？", lede: "都市を検索すると国は自動で入ります。", from: "出身", based: "拠点", sameAsOrigin: "出身と同じ", search: "都市または国を検索", popular: "人気", cities: "都市", countries: "国", useTyped: "「{q}」を使う", country: "国", clear: "クリア", noMatch: "一致なし。Enter で入力内容を使います。", pickCountry: "国を選択" },
    work: { title: "何をしていますか？", lede: "一言か二言で十分です。", role: "現在の役割", rolePlaceholder: "Acme のプロダクトデザイナー", bio: "短い紹介", bioPlaceholder: "何をつくっていて、何を大切にしているか。", openTo: "興味のある職種", openToPlaceholder: "職種を入力して Enter", openToHint: "最大10件。", jobSeeking: "新しい仕事に前向き", jobSeekingHint: "プロフィールにバッジが付きます。", remove: "削除", suggestions: ["フロントエンド", "バックエンド", "デザイン", "AIエンジニア", "創業者"] },
    links: { title: "どこで会えますか？", lede: "リンクをいくつか追加。ユーザー名だけで十分です。", more: "さらにリンク", github: "GitHub", linkedin: "LinkedIn", x: "X", instagram: "Instagram", gitlab: "GitLab", website: "ウェブサイト", website2: "2つ目のサイト", websitePlaceholder: "you.com", userPlaceholder: "ユーザー名" },
    nav: { next: "続ける", back: "戻る", skip: "今はスキップ", finish: "プロフィールを作成", saving: "保存中...", required: "有効なハンドルと名前を入力してください。", sessionExpired: "セッションが切れました。もう一度サインインしてください。", saveFailed: "プロフィールを保存できませんでした。", salaryTogether: "最低額、最高額、通貨をそろえて入力してください。" },
    agent: { toggle: "エージェントに入力してもらう", title: "エージェントに入力してもらう", body: "これを Claude Code、Codex、または任意のコーディングエージェントに貼り付けてください。Crafter CLI でプロフィールを作り、あなたの OK を待ちます。", copy: "プロンプトをコピー", copied: "コピーしました" },
    settings: { public: "公開プロフィール", location: "場所", work: "仕事", links: "リンク", save: "プロフィールを保存", saved: "プロフィールを更新しました。", privateEyebrow: "非公開のキャリア設定", privateTitle: "合うパートナーに見つけてもらう。", privateBody: "公開プロフィールには表示されず、信頼できるパートナーにのみ共有されます。", salaryMin: "最低年収", salaryMax: "最高年収", currency: "通貨", openToArrangements: "働き方", remote: "リモート", onsite: "出社", hybrid: "ハイブリッド", onsiteCity: "出社可能な都市", resume: "最新の履歴書リンク", agentTitle: "エージェントで更新", agentBody: "これをコーディングエージェントに貼り付けてください。プロフィールを読み、変更を提案し、あなたの OK を待ちます。" },
    loading: "プロフィールを読み込み中",
  },
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""))
}

/** Prompt a member pastes into a coding agent to fill or update the profile from the terminal. */
export function profileAgentPrompt(mode: "onboarding" | "settings") {
  return [
    mode === "onboarding" ? "Create my Crafter Station profile." : "Update my Crafter Station profile.",
    "If `crafter` is not installed, run `npm i -g @crafter/cli` and sign in with `crafter login`.",
    "Run `crafter profile get --json` to see what is already saved.",
    "Gather what you can about me from this machine and my public accounts: handle, name, bio, current role, roles I am open to, origin and current city, and links (GitHub, LinkedIn, X, Instagram, website).",
    "Only the handle and the name are required; leave the rest empty if you are not sure.",
    "Write the result to profile.json, then run `crafter profile update --file profile.json` (a dry run, nothing is saved).",
    "Show me the result and wait for my OK.",
    "Only then run `crafter profile update --file profile.json --confirm`.",
  ].join("\n")
}
