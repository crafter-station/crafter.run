import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { EventsList, type EventListItem } from "@/components/events-list";
import { Container, SectionGap } from "@/components/grid-container";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, withLocale } from "@/lib/i18n";
import { fetchCrafterStationEvents, formatEventDate, type LumaEvent } from "@/lib/luma";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 21600;

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/hackathon", namespace: "pages.hackathon" });
}

function isHackathon(event: LumaEvent) {
  const haystack = [event.title, ...event.tags].join(" ").toLowerCase();
  return haystack.includes("hack");
}

const formatCopy = {
  en: {
    eyebrow: "The format",
    title: "48 hours, one room, working demos.",
    description:
      "hack0 is the hackathon series we run with partners across LatAm. Same shape every time so builders know exactly what they are signing up for.",
    steps: [
      {
        title: "Kickoff",
        body: "Sponsors show the tools their teams actually use, we set the theme, and teams form in the room.",
      },
      {
        title: "Build",
        body: "Two days of focused building with mentors on the floor, credits unlocked, and no filler programming.",
      },
      {
        title: "Demo night",
        body: "Every team demos live. Judging rewards what runs, not what was promised on a slide.",
      },
      {
        title: "After the prize",
        body: "The best projects keep going inside the community: users, feedback, collaborators, and follow-up events.",
      },
    ],
  },
  es: {
    eyebrow: "El formato",
    title: "48 horas, una sala, demos que funcionan.",
    description:
      "hack0 es la serie de hackathons que organizamos con partners en LatAm. Siempre la misma estructura para que los builders sepan exactamente a qué se apuntan.",
    steps: [
      {
        title: "Kickoff",
        body: "Los sponsors muestran las herramientas que sus equipos usan de verdad, definimos el tema y los equipos se arman en la sala.",
      },
      {
        title: "Construcción",
        body: "Dos días construyendo con mentores en la sala, créditos desbloqueados y cero programación de relleno.",
      },
      {
        title: "Demo night",
        body: "Todos los equipos demuestran en vivo. El jurado premia lo que corre, no lo que se prometió en una slide.",
      },
      {
        title: "Después del premio",
        body: "Los mejores proyectos siguen dentro de la comunidad: usuarios, feedback, colaboradores y eventos de seguimiento.",
      },
    ],
  },
  pt: {
    eyebrow: "O formato",
    title: "48 horas, uma sala, demos que funcionam.",
    description:
      "hack0 é a série de hackathons que organizamos com parceiros no LatAm. Sempre o mesmo formato para que os builders saibam exatamente no que estão entrando.",
    steps: [
      {
        title: "Kickoff",
        body: "Os sponsors mostram as ferramentas que seus times usam de verdade, definimos o tema e os times se formam na sala.",
      },
      {
        title: "Construção",
        body: "Dois dias construindo com mentores na sala, créditos liberados e nenhuma programação de enchimento.",
      },
      {
        title: "Demo night",
        body: "Todos os times demonstram ao vivo. O julgamento premia o que roda, não o que foi prometido em um slide.",
      },
      {
        title: "Depois do prêmio",
        body: "Os melhores projetos continuam dentro da comunidade: usuários, feedback, colaboradores e eventos de acompanhamento.",
      },
    ],
  },
  zh: {
    eyebrow: "形式",
    title: "48 小时，一个房间，能跑起来的 demo。",
    description:
      "hack0 是我们和伙伴一起在拉美举办的黑客松系列。每一届结构相同，builder 清楚自己报名的是什么。",
    steps: [
      {
        title: "启动",
        body: "赞助方展示团队真正在用的工具，我们定下主题，队伍在现场组建。第一行代码之前，额度和账号就已开通。",
      },
      {
        title: "开发",
        body: "两天专注开发，导师就在现场，没有填充议程。你的工程师可以坐在桌边随时答疑。",
      },
      {
        title: "Demo 之夜",
        body: "每支队伍现场演示。评审奖励真正跑起来的东西，而不是幻灯片上的承诺。",
      },
      {
        title: "颁奖之后",
        body: "最好的项目在社区里继续走下去：用户、反馈、协作者，以及后续再次展示的活动。",
      },
    ],
  },
  ja: {
    eyebrow: "フォーマット",
    title: "48時間、ひとつの部屋、動くデモ。",
    description:
      "hack0 は、パートナーとともにラテンアメリカ各地で開催しているハッカソンシリーズです。毎回同じ構成なので、ビルダーは何に参加するのかを正確に把握できます。",
    steps: [
      {
        title: "キックオフ",
        body: "スポンサーが自分たちのチームで実際に使っているツールを見せ、テーマを決め、その場でチームが組まれます。クレジットとアカウントは最初のコードより先に有効になります。",
      },
      {
        title: "開発",
        body: "メンターが現場にいる状態で、二日間集中して開発します。埋め合わせのプログラムはありません。御社のエンジニアもテーブルに入って質問に答えられます。",
      },
      {
        title: "デモナイト",
        body: "全チームがライブでデモします。審査は、スライドの約束ではなく実際に動くものを評価します。",
      },
      {
        title: "受賞のあと",
        body: "優れたプロジェクトはコミュニティの中で続きます。ユーザー、フィードバック、協力者、そして再び発表する場となるイベント。",
      },
    ],
  },
} as const;

const ctaCopy = {
  en: {
    buildEyebrow: "For builders",
    buildTitle: "Bring a team, or find one in the room.",
    buildBody:
      "Every edition is announced on hack0.dev and in the community first. Join the WhatsApp network to get the call for teams before it goes public.",
    buildCta: "Open hack0.dev",
    sponsorEyebrow: "For sponsors",
    sponsorTitle: "Put your product in front of builders who will actually use it.",
    sponsorBody:
      "Hackathon sponsorship covers prizes, credits, mentors on the floor, venue, food, and a workshop slot. We shape the package around what you want builders to try.",
  },
  es: {
    buildEyebrow: "Para builders",
    buildTitle: "Trae tu equipo, o ármalo en la sala.",
    buildBody:
      "Cada edición se anuncia primero en hack0.dev y en la comunidad. Entra a la red de WhatsApp para recibir la convocatoria antes de que sea pública.",
    buildCta: "Abrir hack0.dev",
    sponsorEyebrow: "Para sponsors",
    sponsorTitle: "Pon tu producto frente a builders que realmente lo van a usar.",
    sponsorBody:
      "El sponsorship de hackathon cubre premios, créditos, mentores en la sala, venue, comida y un espacio de workshop. Armamos el paquete según lo que quieras que los builders prueben.",
  },
  pt: {
    buildEyebrow: "Para builders",
    buildTitle: "Traga seu time, ou monte um na sala.",
    buildBody:
      "Cada edição é anunciada primeiro no hack0.dev e na comunidade. Entre na rede de WhatsApp para receber a convocatória antes de virar pública.",
    buildCta: "Abrir hack0.dev",
    sponsorEyebrow: "Para sponsors",
    sponsorTitle: "Coloque seu produto na frente de builders que vão usar de verdade.",
    sponsorBody:
      "O sponsorship de hackathon cobre prêmios, créditos, mentores na sala, venue, comida e um espaço de workshop. Montamos o pacote conforme o que você quer que os builders testem.",
  },
  zh: {
    buildEyebrow: "给 builder",
    buildTitle: "带一支队伍来，或者在现场组一支。",
    buildBody:
      "每一届都先在 hack0.dev 和社区里发布。加入 WhatsApp 网络，就能在公开之前收到组队召集。",
    buildCta: "打开 hack0.dev",
    sponsorEyebrow: "给赞助方",
    sponsorTitle: "把你的产品放到真正会用它的 builder 面前。",
    sponsorBody:
      "黑客松赞助覆盖奖金、额度、现场导师、场地、餐饮和一个 workshop 时段。我们按你希望 builder 试用什么来定制方案。",
  },
  ja: {
    buildEyebrow: "ビルダーの方へ",
    buildTitle: "チームで来ても、その場で組んでも。",
    buildBody:
      "各回はまず hack0.dev とコミュニティで告知されます。WhatsApp のネットワークに参加すると、公開前にチーム募集が届きます。",
    buildCta: "hack0.dev を開く",
    sponsorEyebrow: "スポンサーの方へ",
    sponsorTitle: "実際に使ってくれるビルダーの前に、プロダクトを置く。",
    sponsorBody:
      "ハッカソンのスポンサーシップには、賞金、クレジット、現場のメンター、会場、食事、ワークショップ枠が含まれます。ビルダーに何を試してほしいかに合わせてパッケージを設計します。",
  },
} as const;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({ locale: lang, namespace: "pages.hackathon" });
  const common = await getTranslations({ locale: lang, namespace: "common" });
  const format = formatCopy[lang];
  const cta = ctaCopy[lang];
  const { upcoming, past } = await fetchCrafterStationEvents();

  const hackathonUpcoming = upcoming.filter(isHackathon);
  const hackathonPast = past.filter(isHackathon);
  const filterTags = Array.from(
    new Set([...hackathonUpcoming, ...hackathonPast].flatMap((event) => event.tags)),
  ).sort();

  const toListItem = (event: LumaEvent): EventListItem => ({
    id: event.id,
    title: event.title,
    description: event.description,
    url: event.url,
    coverUrl: event.coverUrl,
    location: event.location,
    date: formatEventDate(event.startAt, lang),
    tags: event.tags,
  });

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {format.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
            {format.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {format.description}
          </p>
        </Container>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {format.steps.map((step, i) => (
              <div
                key={step.title}
                className={
                  "min-h-56 p-8 " +
                  (i > 0 ? "border-t border-line md:border-t-0 md:border-l " : "") +
                  (i >= 2 ? "md:border-t xl:border-t-0 " : "") +
                  (i >= 3 ? "xl:border-l " : "")
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-lg tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-b px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">{t("section")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("sectionDescription")}
          </p>
        </Container>
        <Container>
          <EventsList
            upcoming={hackathonUpcoming.map(toListItem)}
            past={hackathonPast.map(toListItem)}
            filterTags={filterTags}
            labels={{
              all: t("all"),
              upcoming: t("upcoming"),
              past: t("past"),
              register: t("register"),
              noEvents: t("noEvents"),
              noFilteredEvents: t("noFilteredEvents"),
            }}
          />
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {cta.buildEyebrow}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-5xl">
                {cta.buildTitle}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {cta.buildBody}
              </p>
              <a
                href="https://hack0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-block"
              >
                <ArrowLink>{cta.buildCta}</ArrowLink>
              </a>
            </div>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="border-y px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {cta.sponsorEyebrow}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight md:text-5xl">
                {cta.sponsorTitle}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {cta.sponsorBody}
              </p>
              <a
                href={withLocale("/events/sponsors", lang)}
                className="group mt-8 inline-block"
              >
                <ArrowLink>{common("openCta")}</ArrowLink>
              </a>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  );
}
