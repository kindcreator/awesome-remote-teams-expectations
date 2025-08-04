# Documentation Maintenance Guide

This guide outlines the essential rules for updating this project's documentation. Your core mission is total adherence when working with docs in any capacity

### Core Principles

*   **Separation of concerns:** Each piece of documentation covers one area and nothing more than that. README business features and overview, docs/backend/* docs/frontend/* docs/devops/* docs/datamodel/* for the technical aspects and so on. Use ONLY the correct file for the correct information
*   **No information duplication:** Each piece of information should be stated in ONE PLACE and ONE PLACE ONLY. References can be redundant. No conflictual information stated in multiple places is allowed
*   **CURRENT CODE is the only source of truth:** The current code is the SOLE and ONLY reference for information you are modifying, now and always. Every information not reflecting the current codebase is wrong or outdated 
*   **Stable Structure:** Do not add new sections to documents unless absolutely essential. Propose major structural changes before implementing.
*   **NOT a Changelog:** Do not add inline dates or timestamps (e.g., "Update June 20:") and things like (NEW / UPDATED / FIXED / NOW WORKING / BROKEN) to document edits except for extraordinary cases where knowledge of the previous wrong approach is critical for the future. All historical changes are managed in the `CHANGELOG.md` AUTOMATICALLY from commits/PRs. Do NOT treat technical documentation like the changelog. It shouldn't track past activities, just document the CURRENT STATE. Similarly, while reviewing code to adapt the documentation, comments with these should be removed unless they highlight critical flaws to be fixed.
*   **Concise, function over form, documents for engineer:** No useless flourishes, concise, rich technical information with no excess or useless obvious elements (e.g. long bullet points of things that a senior developer already knows e.g. a security module helping with data privacy and making the application more secure). This doesn't mean Omitting technical details, on the contrary: aim for information density without useless adjectives and adverbs. Graphs and tables supported by .md and .mdx are great when the technical topic calls for it (e.g. ER schema in the datamodel, architectural diagram in the architectural document, Table for permission mapping and so on).
*   **DO NOT WRITE DOCUMENTS OUTSIDE OF DOCS FOR ANY REASON:** ONLY README.md in the root and docs/frontend/, docs/backend/, docs/procedural/, docs/datamodel/ , docs/devops/ are valid places to write documentation. NOWHERE ELSE. Do NOT write or touch the changelog.
*   **DO NOT TOUCH filelists, filepaths and IgnoreFormat sections in the docmaps:** They update automatically with git hooks. You can modify the rest of the documents without introducing or altering section structure if needed (e.g. with a new core practice or module mention, if needed)

### Document Directory

| Path                               | Purpose                                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                        | A brief business description and high-level overview of the platform's features. **No** in-depth technical details. 
| `/docs/datamodel/docmap.md`        | ALL of the references for datamodel documentation. MANDATORILY LOOK AT THIS EVERY TIME YOU REFOCUS.
| `/docs/frontend/docmap.md`         | ALL of the references for frontend documentation and implementation (all files). MANDATORILY LOOK AT THIS EVERY TIME YOU REFOCUS.       
| `/docs/backend/docmap.md`          | ALL of the references for backend documentation and implementation (all files). MANDATORILY LOOK AT THIS EVERY TIME YOU REFOCUS.
| `/docs/devops/`                    | Top level directory for devops documentation. Mandatorily look at this if you need to release or perform operations tasks.
