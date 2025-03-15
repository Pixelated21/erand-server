CREATE TYPE "public"."authorized_user_type" AS ENUM('permanent', 'one_time');--> statement-breakpoint
CREATE TABLE "authorized_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"phone_number" varchar(150) NOT NULL,
	"address" varchar(150) NOT NULL,
	"tax_registration_number" varchar(15) NOT NULL,
	"id_image_url" text,
	"type" text NOT NULL,
	"status" text DEFAULT 'pending',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "delivery_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(100) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"address" varchar(255),
	"status" varchar(255),
	"notes" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "delivery_requests_phoneNumber_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "delivery_request_parcels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"delivery_request_id" uuid NOT NULL,
	"parcel_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action_type" text,
	"affected_entity_type" text,
	"affected_entity_id" uuid,
	"description" text,
	"previous_value" text,
	"new_value" text,
	"ip_address" text,
	"device_type" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_number" varchar(50),
	"value" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "parcels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tracking_number" varchar(50),
	"internal_tracking_number" varchar(50),
	"value" bigint,
	"weight" bigint,
	"arrival_date" timestamp,
	"delivery_date" timestamp,
	"store" varchar(255),
	"package_type" varchar(255),
	"is_delivered" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "parcel_authorizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"authorized_user_id" uuid,
	"parcel_id" uuid,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "parcel_timelines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parcel_id" uuid NOT NULL,
	"status" varchar(100) NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"location" varchar(255),
	"destination" varchar(255),
	"description" text,
	"note" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" uuid NOT NULL,
	"referred_id" uuid NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"middle_name_initial" varchar(1),
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(255) NOT NULL,
	"identifier" varchar(10) NOT NULL,
	"trn" varchar(20) NOT NULL,
	"street_address" varchar(255) NOT NULL,
	"parish" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"email_verified" timestamp,
	"phone_number_verified" timestamp,
	"referral_code" varchar(10) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phoneNumber_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_identifier_unique" UNIQUE("identifier"),
	CONSTRAINT "users_trn_unique" UNIQUE("trn"),
	CONSTRAINT "users_referralCode_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"identifier" varchar(10) NOT NULL,
	"address" varchar(255),
	"phone" varchar(255),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "locations_identifier_unique" UNIQUE("identifier")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "authorized_users" ADD CONSTRAINT "authorized_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_requests" ADD CONSTRAINT "delivery_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_request_parcels" ADD CONSTRAINT "delivery_request_parcels_delivery_request_id_delivery_requests_id_fk" FOREIGN KEY ("delivery_request_id") REFERENCES "public"."delivery_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_request_parcels" ADD CONSTRAINT "delivery_request_parcels_parcel_id_parcels_id_fk" FOREIGN KEY ("parcel_id") REFERENCES "public"."parcels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcel_authorizations" ADD CONSTRAINT "parcel_authorizations_authorized_user_id_authorized_users_id_fk" FOREIGN KEY ("authorized_user_id") REFERENCES "public"."authorized_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcel_authorizations" ADD CONSTRAINT "parcel_authorizations_parcel_id_parcels_id_fk" FOREIGN KEY ("parcel_id") REFERENCES "public"."parcels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parcel_timelines" ADD CONSTRAINT "parcel_timelines_parcel_id_parcels_id_fk" FOREIGN KEY ("parcel_id") REFERENCES "public"."parcels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrer_id_users_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_id_users_id_fk" FOREIGN KEY ("referred_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "authorizedUsersUserIdIdx" ON "authorized_users" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "delivery_request_phone_number_idx" ON "delivery_requests" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "delivery_request_client_id_idx" ON "delivery_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "delivery_request_parcels_delivery_request_id_idx" ON "delivery_request_parcels" USING btree ("delivery_request_id");--> statement-breakpoint
CREATE INDEX "logsUserIdIdx" ON "logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "logsActionTypeIdx" ON "logs" USING btree ("action_type");--> statement-breakpoint
CREATE INDEX "ordersClientIdIdx" ON "orders" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "parcelsTrackingNumberIdx" ON "parcels" USING btree ("tracking_number");--> statement-breakpoint
CREATE INDEX "parcelsUserIdIdx" ON "parcels" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "parcelsInternalTrackingNumberIdx" ON "parcels" USING btree ("internal_tracking_number");--> statement-breakpoint
CREATE INDEX "parcel_authorizations_authorized_user_id_idx" ON "parcel_authorizations" USING btree ("authorized_user_id");--> statement-breakpoint
CREATE INDEX "parcel_authorizations_parcel_id_idx" ON "parcel_authorizations" USING btree ("parcel_id");--> statement-breakpoint
CREATE INDEX "parcelTimelineParcelIdIdx" ON "parcel_timelines" USING btree ("parcel_id");--> statement-breakpoint
CREATE INDEX "referralsReferrerIdIdx" ON "referrals" USING btree ("referrer_id");--> statement-breakpoint
CREATE INDEX "referralsReferredIdIdx" ON "referrals" USING btree ("referred_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_identifier_idx" ON "users" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "location_identifier_idx" ON "locations" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "location_name_idx" ON "locations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "roles_name_idx" ON "roles" USING btree ("name");