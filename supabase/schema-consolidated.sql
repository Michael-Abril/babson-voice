-- =====================================================
-- BABSON VOICE - CONSOLIDATED DATABASE SCHEMA
-- =====================================================
-- This is the SINGLE source of truth for the database.
-- Run this in Supabase SQL Editor to set up or fix the database.
-- =====================================================

-- ─────────────────────────────────────────
-- STEP 1: Clean up any duplicate data first
-- (Safe to run even if no duplicates exist)
-- ─────────────────────────────────────────

-- Remove duplicate votes (keep most recent per user per idea)
DELETE FROM votes
WHERE id NOT IN (
  SELECT DISTINCT ON ("ideaId", "voterId") id
  FROM votes
  ORDER BY "ideaId", "voterId", "createdAt" DESC
);

-- Remove duplicate volunteers (keep earliest signup per user per idea)
DELETE FROM volunteers
WHERE id NOT IN (
  SELECT DISTINCT ON ("ideaId", "userId") id
  FROM volunteers
  ORDER BY "ideaId", "userId", "signedUpAt" ASC
);

-- ─────────────────────────────────────────
-- STEP 2: Add UNIQUE constraints if missing
-- (Will error if already exists - that's OK)
-- ─────────────────────────────────────────

-- One vote per user per idea
ALTER TABLE votes
  ADD CONSTRAINT votes_ideaId_voterId_unique
  UNIQUE ("ideaId", "voterId");

-- One volunteer signup per user per idea
ALTER TABLE volunteers
  ADD CONSTRAINT volunteers_ideaId_userId_unique
  UNIQUE ("ideaId", "userId");

-- ─────────────────────────────────────────
-- STEP 3: Verify constraints exist
-- ─────────────────────────────────────────

SELECT
  c.conname AS constraint_name,
  t.relname AS table_name
FROM pg_constraint c
JOIN pg_class t ON c.conrelid = t.oid
WHERE t.relname IN ('votes', 'volunteers')
  AND c.contype = 'u'
ORDER BY t.relname;

-- Expected output:
-- votes_ideaId_voterId_unique      | votes
-- volunteers_ideaId_userId_unique  | volunteers
