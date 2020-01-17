# API ENDPOINTS

## Token

`/api/v2/token` (POST)

## Sync

`/api/v2/sync` (GET)
`/api/v2/sync/:timestamp` (GET)

## User

`/api/v2/user` (GET, POST)

`/api/v2/user/:user_id` (GET, PUT, DELETE)

## Project

`/api/v2/project` (GET, POST)

`/api/v2/project/:project_id` (GET, PUT, DELETE)

## DataForm

`/api/v2/data_form` (GET, POST)

`/api/v2/data_form/:form_id` (GET, PUT, DELETE)

## DataEntry

`/api/v2/data_entry` (GET, POST)

`/api/v2/data_entry/:session_id/:entry_id` (GET, PUT, DELETE)

## Session

`/api/v2/session` (GET, POST)

`/api/v2/session/:session_id` (GET, PUT, DELETE)

## AnswerSet

`/api/v2/answer_set` (GET, POST)

`/api/v2/answer_set/:set_name` (GET, PUT, DELETE)

## DeletedItem

`/api/v2/deleted_item` (GET, POST)

`/api/v2/deleted_item/:deleted_id` (GET, PUT, DELETE)

## ContributesTo

`/api/v2/contributes_to` (GET, POST)

`/api/v2/contributes_to/:user_id/:project_id` (GET, PUT, DELETE)

## BelongsTo

`/api/v2/belongs_to` (GET, POST)

`/api/v2/belongs_to/:form_id/:project_id` (GET, PUT, DELETE)
