import { memberSources, shipLinkTypes, shipSources, shipStatuses } from "@crafter/contracts"
import { sql } from "drizzle-orm"
import {
  boolean,
  check,
  index,
  doublePrecision,
  integer,
  jsonb,
  pgEnum,
  primaryKey,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const shipStatus = pgEnum("ship_status", shipStatuses)
export const shipSource = pgEnum("ship_source", shipSources)
export const memberSource = pgEnum("member_source", memberSources)
export const shipLinkType = pgEnum("ship_link_type", shipLinkTypes)

export const members = pgTable(
  "members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: text("clerk_user_id").notNull().unique(),
    handle: text("handle").notNull(),
    displayName: text("display_name").notNull(),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    githubUrl: text("github_url"),
    gitlabUrl: text("gitlab_url"),
    linkedinUrl: text("linkedin_url"),
    instagramUrl: text("instagram_url"),
    xUrl: text("x_url"),
    primaryWebsiteUrl: text("primary_website_url"),
    secondaryWebsiteUrl: text("secondary_website_url"),
    currentRole: text("current_role"),
    rolesOpenTo: text("roles_open_to").array().default(sql`'{}'::text[]`).notNull(),
    isJobSeeking: boolean("is_job_seeking").default(false).notNull(),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    salaryCurrency: text("salary_currency"),
    workArrangements: text("work_arrangements").array().default(sql`'{}'::text[]`).notNull(),
    onsiteCity: text("onsite_city"),
    resumeUrl: text("resume_url"),
    originCity: text("origin_city"),
    originRegion: text("origin_region"),
    originCountry: text("origin_country"),
    originCountryCode: text("origin_country_code"),
    originLatitude: doublePrecision("origin_latitude"),
    originLongitude: doublePrecision("origin_longitude"),
    originPlaceId: text("origin_place_id"),
    originGeocodeProvider: text("origin_geocode_provider"),
    originGeocodeConfidence: doublePrecision("origin_geocode_confidence"),
    basedCity: text("based_city"),
    basedRegion: text("based_region"),
    basedCountry: text("based_country"),
    basedCountryCode: text("based_country_code"),
    basedLatitude: doublePrecision("based_latitude"),
    basedLongitude: doublePrecision("based_longitude"),
    basedPlaceId: text("based_place_id"),
    basedGeocodeProvider: text("based_geocode_provider"),
    basedGeocodeConfidence: doublePrecision("based_geocode_confidence"),
    source: memberSource("source").default("web").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("members_handle_lower_idx").on(sql`lower(${table.handle})`),
    index("members_origin_country_city_idx").on(table.originCountryCode, table.originCity),
    index("members_based_country_city_idx").on(table.basedCountryCode, table.basedCity),
    check("members_handle_check", sql`${table.handle} ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'`),
    check("members_display_name_check", sql`char_length(trim(${table.displayName})) between 1 and 80`),
    check("members_bio_check", sql`${table.bio} is null or char_length(trim(${table.bio})) between 1 and 280`),
    check("members_avatar_url_check", sql`${table.avatarUrl} is null or ${table.avatarUrl} ~ '^https?://'`),
    check("members_github_url_check", sql`${table.githubUrl} is null or ${table.githubUrl} ~ '^https?://'`),
    check("members_gitlab_url_check", sql`${table.gitlabUrl} is null or ${table.gitlabUrl} ~ '^https?://'`),
    check("members_linkedin_url_check", sql`${table.linkedinUrl} is null or ${table.linkedinUrl} ~ '^https?://'`),
    check("members_instagram_url_check", sql`${table.instagramUrl} is null or ${table.instagramUrl} ~ '^https?://'`),
    check("members_x_url_check", sql`${table.xUrl} is null or ${table.xUrl} ~ '^https?://'`),
    check("members_primary_website_url_check", sql`${table.primaryWebsiteUrl} is null or ${table.primaryWebsiteUrl} ~ '^https?://'`),
    check("members_secondary_website_url_check", sql`${table.secondaryWebsiteUrl} is null or ${table.secondaryWebsiteUrl} ~ '^https?://'`),
    check("members_current_role_check", sql`${table.currentRole} is null or char_length(trim(${table.currentRole})) between 1 and 120`),
    check("members_roles_open_to_check", sql`cardinality(${table.rolesOpenTo}) <= 10`),
    check(
      "members_salary_range_check",
      sql`(${table.salaryMin} is null and ${table.salaryMax} is null and ${table.salaryCurrency} is null) or (${table.salaryMin} is not null and ${table.salaryMax} is not null and ${table.salaryCurrency} is not null and ${table.salaryMin} >= 0 and ${table.salaryMin} <= ${table.salaryMax} and ${table.salaryMax} <= 10000000 and ${table.salaryCurrency} ~ '^[A-Z]{3}$')`,
    ),
    check(
      "members_work_arrangements_check",
      sql`cardinality(${table.workArrangements}) <= 3 and ${table.workArrangements} <@ array['remote', 'onsite', 'hybrid']::text[]`,
    ),
    check("members_onsite_city_check", sql`${table.onsiteCity} is null or char_length(trim(${table.onsiteCity})) between 1 and 120`),
    check(
      "members_onsite_preference_check",
      sql`((${table.workArrangements} && array['onsite', 'hybrid']::text[]) and ${table.onsiteCity} is not null) or (not (${table.workArrangements} && array['onsite', 'hybrid']::text[]) and ${table.onsiteCity} is null)`,
    ),
    check("members_resume_url_check", sql`${table.resumeUrl} is null or ${table.resumeUrl} ~ '^https?://'`),
    check("members_origin_city_check", sql`${table.originCity} is null or char_length(trim(${table.originCity})) between 1 and 80`),
    check("members_origin_region_check", sql`${table.originRegion} is null or char_length(trim(${table.originRegion})) between 1 and 120`),
    check("members_origin_country_check", sql`${table.originCountry} is null or char_length(trim(${table.originCountry})) between 1 and 80`),
    check("members_origin_country_code_check", sql`${table.originCountryCode} is null or ${table.originCountryCode} ~ '^[A-Z]{2}$'`),
    check(
      "members_origin_coordinates_check",
      sql`(${table.originLatitude} is null and ${table.originLongitude} is null) or (${table.originLatitude} is not null and ${table.originLongitude} is not null and ${table.originLatitude} between -90 and 90 and ${table.originLongitude} between -180 and 180)`,
    ),
    check("members_origin_place_id_check", sql`${table.originPlaceId} is null or char_length(trim(${table.originPlaceId})) between 1 and 200`),
    check("members_origin_geocode_provider_check", sql`${table.originGeocodeProvider} is null or char_length(trim(${table.originGeocodeProvider})) between 1 and 40`),
    check("members_origin_geocode_confidence_check", sql`${table.originGeocodeConfidence} is null or (${table.originGeocodeConfidence} >= 0 and ${table.originGeocodeConfidence} <= 1)`),
    check("members_based_city_check", sql`${table.basedCity} is null or char_length(trim(${table.basedCity})) between 1 and 80`),
    check("members_based_region_check", sql`${table.basedRegion} is null or char_length(trim(${table.basedRegion})) between 1 and 120`),
    check("members_based_country_check", sql`${table.basedCountry} is null or char_length(trim(${table.basedCountry})) between 1 and 80`),
    check("members_based_country_code_check", sql`${table.basedCountryCode} is null or ${table.basedCountryCode} ~ '^[A-Z]{2}$'`),
    check(
      "members_based_coordinates_check",
      sql`(${table.basedLatitude} is null and ${table.basedLongitude} is null) or (${table.basedLatitude} is not null and ${table.basedLongitude} is not null and ${table.basedLatitude} between -90 and 90 and ${table.basedLongitude} between -180 and 180)`,
    ),
    check("members_based_place_id_check", sql`${table.basedPlaceId} is null or char_length(trim(${table.basedPlaceId})) between 1 and 200`),
    check("members_based_geocode_provider_check", sql`${table.basedGeocodeProvider} is null or char_length(trim(${table.basedGeocodeProvider})) between 1 and 40`),
    check("members_based_geocode_confidence_check", sql`${table.basedGeocodeConfidence} is null or (${table.basedGeocodeConfidence} >= 0 and ${table.basedGeocodeConfidence} <= 1)`),
  ],
)

export const ships = pgTable(
  "ships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerMemberId: uuid("owner_member_id")
      .notNull()
      .references(() => members.id, { onDelete: "restrict" }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    socialPostUrl: text("social_post_url"),
    status: shipStatus("status").default("draft").notNull(),
    source: shipSource("source").default("web").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string", precision: 3 }).defaultNow().notNull(),
  },
  (table) => [
    index("ships_owner_created_idx").on(table.ownerMemberId, table.createdAt.desc()),
    index("ships_status_published_idx").on(table.status, table.publishedAt.desc()),
    check("ships_slug_check", sql`${table.slug} ~ '^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$'`),
    check("ships_name_check", sql`char_length(trim(${table.name})) between 1 and 100`),
    check("ships_tagline_check", sql`char_length(trim(${table.tagline})) between 4 and 180`),
    check("ships_description_check", sql`char_length(trim(${table.description})) between 20 and 5000`),
    check("ships_image_url_check", sql`${table.imageUrl} is null or ${table.imageUrl} ~ '^https?://'`),
    check("ships_social_post_url_check", sql`${table.socialPostUrl} is null or ${table.socialPostUrl} ~ '^https?://'`),
    check(
      "ships_published_at_check",
      sql`(${table.status} = 'published' and ${table.publishedAt} is not null) or (${table.status} <> 'published')`,
    ),
  ],
)

export const shipLinks = pgTable(
  "ship_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    shipId: uuid("ship_id")
      .notNull()
      .references(() => ships.id, { onDelete: "cascade" }),
    type: shipLinkType("type").notNull(),
    url: text("url").notNull(),
    verifiedAt: timestamp("verified_at", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    index("ship_links_ship_idx").on(table.shipId),
    uniqueIndex("ship_links_ship_type_url_idx").on(table.shipId, table.type, table.url),
    uniqueIndex("ship_links_public_url_idx")
      .on(table.url)
      .where(sql`${table.type} in ('repository', 'website')`),
    check(
      "ship_links_url_check",
      sql`char_length(${table.url}) between 8 and 2048 and ${table.url} ~ '^https?://'`,
    ),
  ],
)

export const shipUpdates = pgTable(
  "ship_updates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    shipId: uuid("ship_id")
      .notNull()
      .references(() => ships.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    socialPostUrl: text("social_post_url"),
    publishedAt: timestamp("published_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    index("ship_updates_ship_published_idx").on(table.shipId, table.publishedAt.desc()),
    check("ship_updates_title_check", sql`char_length(trim(${table.title})) between 1 and 100`),
    check("ship_updates_description_check", sql`char_length(trim(${table.description})) between 4 and 5000`),
    check("ship_updates_image_url_check", sql`${table.imageUrl} is null or ${table.imageUrl} ~ '^https?://'`),
    check("ship_updates_social_post_url_check", sql`${table.socialPostUrl} is null or ${table.socialPostUrl} ~ '^https?://'`),
  ],
)

export const shipProvenance = pgTable(
  "ship_provenance",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    shipId: uuid("ship_id")
      .notNull()
      .references(() => ships.id, { onDelete: "cascade" }),
    value: text("value").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    index("ship_provenance_ship_idx").on(table.shipId),
    uniqueIndex("ship_provenance_ship_value_idx").on(table.shipId, table.value),
    check("ship_provenance_value_check", sql`char_length(trim(${table.value})) between 1 and 2048`),
  ],
)

export const shipVotes = pgTable(
  "ship_votes",
  {
    shipId: uuid("ship_id")
      .notNull()
      .references(() => ships.id, { onDelete: "cascade" }),
    voterClerkUserId: text("voter_clerk_user_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.shipId, table.voterClerkUserId] }),
    index("ship_votes_voter_clerk_user_idx").on(table.voterClerkUserId),
  ],
)

export const apiIdempotencyKeys = pgTable(
  "api_idempotency_keys",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    memberId: uuid("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    route: text("route").notNull(),
    requestHash: text("request_hash").notNull().default(""),
    responseStatus: text("response_status"),
    responseBody: jsonb("response_body"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("api_idempotency_member_key_route_idx").on(table.memberId, table.key, table.route),
    check("api_idempotency_key_check", sql`char_length(${table.key}) between 8 and 200`),
  ],
)

export const apiRateLimits = pgTable(
  "api_rate_limits",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    memberId: uuid("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    operation: text("operation").notNull(),
    windowStartedAt: timestamp("window_started_at", { withTimezone: true, mode: "string" }).notNull(),
    count: integer("count").notNull().default(1),
  },
  (table) => [
    uniqueIndex("api_rate_limits_member_operation_window_idx").on(
      table.memberId,
      table.operation,
      table.windowStartedAt,
    ),
  ],
)

export const nextProjects = pgTable(
  "next_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    idea: text("idea").notNull(),
    alias: text("alias"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    check("next_projects_idea_length", sql`char_length(trim(${table.idea})) between 4 and 600`),
    check(
      "next_projects_alias_length",
      sql`${table.alias} is null or char_length(trim(${table.alias})) between 1 and 80`,
    ),
  ],
)

export const nextProjectVotes = pgTable(
  "next_project_votes",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => nextProjects.id, { onDelete: "cascade" }),
    voterId: text("voter_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.voterId] }),
    check("next_project_votes_voter_id_length", sql`char_length(${table.voterId}) between 16 and 120`),
  ],
)

export const audienceQuestions = pgTable(
  "audience_questions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    boardSlug: text("board_slug").notNull(),
    question: text("question").notNull(),
    context: text("context"),
    alias: text("alias"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    index("audience_questions_board_created_idx").on(table.boardSlug, table.createdAt.desc()),
    check(
      "audience_questions_board_slug_check",
      sql`${table.boardSlug} ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' and char_length(${table.boardSlug}) between 2 and 80`,
    ),
    check("audience_questions_question_check", sql`char_length(trim(${table.question})) between 4 and 900`),
    check(
      "audience_questions_context_check",
      sql`${table.context} is null or char_length(trim(${table.context})) between 1 and 1200`,
    ),
    check(
      "audience_questions_alias_check",
      sql`${table.alias} is null or char_length(trim(${table.alias})) between 2 and 80`,
    ),
  ],
)

export const audienceQuestionVotes = pgTable(
  "audience_question_votes",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => audienceQuestions.id, { onDelete: "cascade" }),
    voterId: text("voter_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.questionId, table.voterId] }),
    check("audience_question_votes_voter_id_check", sql`char_length(${table.voterId}) between 16 and 120`),
  ],
)
