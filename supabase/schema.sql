-- Babson Voice — Supabase Database Schema
-- Run this entire file in the Supabase SQL Editor (one paste, one click Run).
-- All column names are double-quoted to preserve camelCase and match the TypeScript types exactly.

-- ─────────────────────────────────────────
-- IDEAS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ideas (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title           text        NOT NULL,
  body            text        NOT NULL,
  category        text        NOT NULL,
  upvotes         integer     DEFAULT 0 NOT NULL,
  downvotes       integer     DEFAULT 0 NOT NULL,
  "volunteerCount" integer    DEFAULT 0 NOT NULL,
  "createdAt"     timestamptz DEFAULT now() NOT NULL
);

-- ─────────────────────────────────────────
-- VOTES
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS votes (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId"    uuid        REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "voterId"   text        NOT NULL,
  "voteType"  text        NOT NULL CHECK ("voteType" IN ('up', 'down')),
  "createdAt" timestamptz DEFAULT now() NOT NULL
);

-- ─────────────────────────────────────────
-- VOLUNTEERS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS volunteers (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  "ideaId"     uuid        REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  "userId"     text        NOT NULL,
  email        text        NOT NULL,
  "signedUpAt" timestamptz DEFAULT now() NOT NULL
);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Anonymous users can read and write everything.
-- ─────────────────────────────────────────
ALTER TABLE ideas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"   ON ideas      FOR SELECT USING (true);
CREATE POLICY "public insert" ON ideas      FOR INSERT WITH CHECK (true);
CREATE POLICY "public update" ON ideas      FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "public read"   ON votes      FOR SELECT USING (true);
CREATE POLICY "public insert" ON votes      FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete" ON votes      FOR DELETE USING (true);

CREATE POLICY "public read"   ON volunteers FOR SELECT USING (true);
CREATE POLICY "public insert" ON volunteers FOR INSERT WITH CHECK (true);
