import type { Locale } from "@/lib/i18n"

export type AgendaCopy = {
  title: [string, string]; description: string; name: string; eyebrow: string
  explore: string; follow: string; next: string; happening: string; details: string
  upcoming: string; past: string; all: string; source: string
  search: string; searchLabel: string; timezone: string; localTime: string
  allDay: string; locationPending: string; by: string; results: string; result: string
  empty: string; noUpcoming: string; unavailable: string; reset: string; more: string
  subscribe: string; subscribeBody: string; ical: string; archive: string
  invite: string; inviteBody: string; propose: string; collaborate: string
}

export const agendaCopy: Record<Locale, AgendaCopy> = {
  es: {
    name: "Agenda hack0", eyebrow: "HACK0 / BY CRAFTER STATION", title: ["Nos vemos", "en hack0."],
    description: "Meetups, hackathons y buenas conversaciones. La agenda que compartimos para que el próximo encuentro esté un poco más cerca.",
    explore: "Explorar la agenda", follow: "Seguir hack0 en Luma", next: "Próximo en la agenda", happening: "Está pasando", details: "Ver evento en Luma",
    upcoming: "Próximos", past: "Archivo", all: "Todos", source: "Del calendario público de hack0",
    search: "Evento, lugar u organizador…", searchLabel: "Buscar eventos", timezone: "Zona horaria", localTime: "Mi zona",
    allDay: "Todo el día", locationPending: "Ubicación en Luma", by: "Por", results: "{count} eventos", result: "{count} evento",
    empty: "No encontramos eventos con esa búsqueda.", noUpcoming: "Por ahora no hay nuevos encuentros. El archivo sigue abierto.",
    unavailable: "No pudimos cargar la agenda. Puedes consultar todos los eventos directamente en Luma.",
    reset: "Limpiar búsqueda", more: "Mostrar más eventos", archive: "Explorar el archivo",
    subscribe: "Que el próximo encuentro llegue a tu calendario.", subscribeBody: "Suscríbete al calendario de hack0 para recibir las nuevas fechas y sus cambios.",
    ical: "Feed iCal", invite: "¿Tienes algo en mente?", inviteBody: "El calendario también reúne eventos de la comunidad. Propón el tuyo desde hack0.",
    propose: "Proponer un evento en Luma", collaborate: "Colabora con Crafter",
  },
  en: {
    name: "hack0 Calendar", eyebrow: "HACK0 / BY CRAFTER STATION", title: ["See you", "at hack0."],
    description: "Meetups, hackathons, and good conversations. Our shared calendar brings the next gathering a little closer.",
    explore: "Explore the calendar", follow: "Follow hack0 on Luma", next: "Next on the calendar", happening: "Happening now", details: "View event on Luma",
    upcoming: "Upcoming", past: "Archive", all: "All", source: "From the public hack0 calendar",
    search: "Event, place, or organizer…", searchLabel: "Search events", timezone: "Time zone", localTime: "My time zone",
    allDay: "All day", locationPending: "Location on Luma", by: "By", results: "{count} events", result: "{count} event",
    empty: "No events match your search.", noUpcoming: "No new gatherings for now. The archive is still open.",
    unavailable: "We couldn't load the calendar. You can find all events directly on Luma.",
    reset: "Clear search", more: "Show more events", archive: "Explore the archive",
    subscribe: "Let the next gathering find your calendar.", subscribeBody: "Subscribe to the hack0 calendar for new dates and updates.",
    ical: "iCal feed", invite: "Have something in mind?", inviteBody: "The calendar also brings together community events. Submit yours through hack0.",
    propose: "Submit an event on Luma", collaborate: "Collaborate with Crafter",
  },
  pt: {
    name: "Agenda hack0", eyebrow: "HACK0 / BY CRAFTER STATION", title: ["Nos vemos", "no hack0."],
    description: "Meetups, hackathons e boas conversas. Uma agenda compartilhada para deixar o próximo encontro um pouco mais perto.",
    explore: "Explorar a agenda", follow: "Seguir hack0 no Luma", next: "Próximo na agenda", happening: "Acontecendo agora", details: "Ver evento no Luma",
    upcoming: "Próximos", past: "Arquivo", all: "Todos", source: "Do calendário público do hack0",
    search: "Evento, local ou organizador…", searchLabel: "Buscar eventos", timezone: "Fuso horário", localTime: "Meu fuso",
    allDay: "Dia inteiro", locationPending: "Local no Luma", by: "Por", results: "{count} eventos", result: "{count} evento",
    empty: "Nenhum evento corresponde à busca.", noUpcoming: "Sem novos encontros por enquanto. O arquivo continua aberto.",
    unavailable: "Não foi possível carregar a agenda. Consulte todos os eventos diretamente no Luma.",
    reset: "Limpar busca", more: "Mostrar mais eventos", archive: "Explorar o arquivo",
    subscribe: "Que o próximo encontro chegue ao seu calendário.", subscribeBody: "Assine o calendário do hack0 para receber novas datas e atualizações.",
    ical: "Feed iCal", invite: "Tem algo em mente?", inviteBody: "O calendário também reúne eventos da comunidade. Envie o seu pelo hack0.",
    propose: "Propor um evento no Luma", collaborate: "Colabore com a Crafter",
  },
  zh: {
    name: "hack0 活动日历", eyebrow: "HACK0 / BY CRAFTER STATION", title: ["相聚", "在 hack0。"],
    description: "聚会、黑客松和有趣的交流。通过共享日历，让下一次相聚离我们更近。",
    explore: "探索日历", follow: "在 Luma 关注 hack0", next: "下一场活动", happening: "正在进行", details: "在 Luma 查看活动",
    upcoming: "即将举行", past: "往期", all: "全部", source: "来自 hack0 公开日历",
    search: "活动、地点或主办方…", searchLabel: "搜索活动", timezone: "时区", localTime: "我的时区",
    allDay: "全天", locationPending: "在 Luma 查看地点", by: "主办方", results: "{count} 场活动", result: "{count} 场活动",
    empty: "没有符合搜索条件的活动。", noUpcoming: "暂时没有新的聚会，往期活动仍可查看。",
    unavailable: "无法加载日历，请在 Luma 直接查看全部活动。",
    reset: "清除搜索", more: "显示更多活动", archive: "查看往期活动",
    subscribe: "让下一次相聚出现在你的日历里。", subscribeBody: "订阅 hack0 日历，获取新活动日期及更新。",
    ical: "iCal 订阅", invite: "有活动想法？", inviteBody: "日历也收录社区活动。通过 hack0 提交你的活动。",
    propose: "在 Luma 提交活动", collaborate: "与 Crafter 合作",
  },
  ja: {
    name: "hack0 カレンダー", eyebrow: "HACK0 / BY CRAFTER STATION", title: ["会おう、", "hack0 で。"],
    description: "ミートアップ、ハッカソン、楽しい会話。みんなのカレンダーで、次の集まりをもっと身近に。",
    explore: "予定を探す", follow: "Luma で hack0 をフォロー", next: "次の予定", happening: "開催中", details: "Luma でイベントを見る",
    upcoming: "開催予定", past: "アーカイブ", all: "すべて", source: "hack0 の公開カレンダーから",
    search: "イベント、場所、主催者…", searchLabel: "イベントを検索", timezone: "タイムゾーン", localTime: "自分の時間帯",
    allDay: "終日", locationPending: "場所は Luma で確認", by: "主催", results: "{count} 件のイベント", result: "{count} 件のイベント",
    empty: "検索条件に合うイベントがありません。", noUpcoming: "新しい集まりはまだありません。過去のイベントをご覧ください。",
    unavailable: "カレンダーを読み込めませんでした。Luma ですべてのイベントをご確認ください。",
    reset: "検索をクリア", more: "もっと見る", archive: "アーカイブを見る",
    subscribe: "次の集まりを、あなたのカレンダーに。", subscribeBody: "hack0 のカレンダーを購読して、新しい日程や変更を受け取りましょう。",
    ical: "iCal フィード", invite: "何か企画していますか？", inviteBody: "コミュニティのイベントも掲載しています。hack0 からお送りください。",
    propose: "Luma でイベントを提案", collaborate: "Crafter と協力する",
  },
}
