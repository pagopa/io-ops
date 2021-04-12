# io-ops

IO operations tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/io-ops.svg)](https://npmjs.org/package/io-ops)
[![CircleCI](https://circleci.com/gh/teamdigitale/io-ops/tree/master.svg?style=shield)](https://circleci.com/gh/teamdigitale/io-ops/tree/master)
[![Codecov](https://codecov.io/gh/teamdigitale/io-ops/branch/master/graph/badge.svg)](https://codecov.io/gh/teamdigitale/io-ops)
[![Downloads/week](https://img.shields.io/npm/dw/io-ops.svg)](https://npmjs.org/package/io-ops)
[![License](https://img.shields.io/npm/l/io-ops.svg)](https://github.com/teamdigitale/io-ops/blob/master/package.json)

<!-- toc -->
* [io-ops](#io-ops)
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Requirements

### Environment variables

The following sets of commands require the environment variabiles listed in the table below:
`api-services:*`, `users:*`, `migrate-service`.

| Variable name  | Description                                             | type   |
| -------------- | ------------------------------------------------------- | ------ |
| BASE_URL_ADMIN | The URL of the admin functions API                      | string |
| OCP_APIM       | The key used to authenticate to the admin functions API | string |

# Usage

<!-- usage -->
```sh-session
$ npm install -g io-ops
$ io-ops COMMAND
running command...
$ io-ops (-v|--version|version)
io-ops/0.2.0 darwin-x64 node-v12.18.0
$ io-ops --help [COMMAND]
USAGE
  $ io-ops COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`io-ops api-services:create`](#io-ops-api-servicescreate)
* [`io-ops api-services:get SERVICEID`](#io-ops-api-servicesget-serviceid)
* [`io-ops api-services:get-all`](#io-ops-api-servicesget-all)
* [`io-ops api-services:keys SERVICEID`](#io-ops-api-serviceskeys-serviceid)
* [`io-ops api-services:keys-regenerate SERVICEID`](#io-ops-api-serviceskeys-regenerate-serviceid)
* [`io-ops api-services:logo SERVICEID`](#io-ops-api-serviceslogo-serviceid)
* [`io-ops api-services:update`](#io-ops-api-servicesupdate)
* [`io-ops hello`](#io-ops-hello)
* [`io-ops help [COMMAND]`](#io-ops-help-command)
* [`io-ops messages:attributes`](#io-ops-messagesattributes)
* [`io-ops messages:check-content`](#io-ops-messagescheck-content)
* [`io-ops messages:list FISCALCODE`](#io-ops-messageslist-fiscalcode)
* [`io-ops migrate-services METADATA`](#io-ops-migrate-services-metadata)
* [`io-ops profiles:delete FISCALCODE`](#io-ops-profilesdelete-fiscalcode)
* [`io-ops profiles:exist`](#io-ops-profilesexist)
* [`io-ops profiles:list`](#io-ops-profileslist)
* [`io-ops services:check`](#io-ops-servicescheck)
* [`io-ops services:details`](#io-ops-servicesdetails)
* [`io-ops services:export`](#io-ops-servicesexport)
* [`io-ops services:list`](#io-ops-serviceslist)
* [`io-ops users:create`](#io-ops-userscreate)
* [`io-ops users:get EMAIL`](#io-ops-usersget-email)
* [`io-ops users:get-all`](#io-ops-usersget-all)
* [`io-ops users:subscription EMAIL SUBSCRIPTIONID`](#io-ops-userssubscription-email-subscriptionid)
* [`io-ops users:update-groups EMAIL`](#io-ops-usersupdate-groups-email)
* [`io-ops users:update_user_token_name EMAIL TOKENNAMEVALUE`](#io-ops-usersupdate_user_token_name-email-tokennamevalue)
* [`io-ops users:write-messages EMAIL ACTION`](#io-ops-userswrite-messages-email-action)
* [`io-ops users:write-services EMAIL ACTION`](#io-ops-userswrite-services-email-action)

## `io-ops api-services:create`

Create a service

```
USAGE
  $ io-ops api-services:create

OPTIONS
  --json=json  (required) JSON string rapresentation of a service

EXAMPLE
  $ io-ops api-service:create  --json='{ "authorized_cidrs": [], "authorized_recipients": [], "department_name": 
  "department_test", "organization_fiscal_code": "12345670013", "organization_name": "organization_name", "service_id": 
  "test-api-123", "service_name": "test_name", "is_visible": false, "max_allowed_payment_amount": 0, 
  "require_secure_channels": false }'
```

_See code: [src/commands/api-services/create.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/create.ts)_

## `io-ops api-services:get SERVICEID`

Get the service by serviceId

```
USAGE
  $ io-ops api-services:get SERVICEID

ARGUMENTS
  SERVICEID  id of the service

EXAMPLE
  $ io-ops api-service:get  SERVICEID
```

_See code: [src/commands/api-services/get.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/get.ts)_

## `io-ops api-services:get-all`

Get all services

```
USAGE
  $ io-ops api-services:get-all

EXAMPLE
  $ io-ops api-service:get-all
```

_See code: [src/commands/api-services/get-all.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/get-all.ts)_

## `io-ops api-services:keys SERVICEID`

Get subscription keys associated to service

```
USAGE
  $ io-ops api-services:keys SERVICEID

ARGUMENTS
  SERVICEID  id of the service

EXAMPLE
  $ io-ops api-service:keys SERVICEID
```

_See code: [src/commands/api-services/keys.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/keys.ts)_

## `io-ops api-services:keys-regenerate SERVICEID`

Regenerate keys associated to service

```
USAGE
  $ io-ops api-services:keys-regenerate SERVICEID

ARGUMENTS
  SERVICEID  id of the service

OPTIONS
  --key_type=PRIMARY_KEY|SECONDARY_KEY  (required) JSON string rapresentation of a service

EXAMPLE
  $ io-ops api-service:keys-regenerate  SERVICEID --key_type=PRIMARY_KEY
```

_See code: [src/commands/api-services/keys-regenerate.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/keys-regenerate.ts)_

## `io-ops api-services:logo SERVICEID`

Update service data with base64 of the logo

```
USAGE
  $ io-ops api-services:logo SERVICEID

ARGUMENTS
  SERVICEID  id of the service

OPTIONS
  --logo=logo  (required) Path of logo image to be uploaded

EXAMPLE
  $ io-ops api-service:logo SERVICEID --logo ~/PATH/logo.png
```

_See code: [src/commands/api-services/logo.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/logo.ts)_

## `io-ops api-services:update`

Update a service

```
USAGE
  $ io-ops api-services:update

OPTIONS
  --json=json  (required) JSON string rapresentation of a service

EXAMPLE
  $ io-ops api-service:update  --json='{ "authorized_cidrs": [], "authorized_recipients": [], "department_name": 
  "department_test", "organization_fiscal_code": "12345670013", "organization_name": "organization_name", "service_id": 
  "test-api-123", "service_name": "test_name", "is_visible": false, "max_allowed_payment_amount": 0, 
  "require_secure_channels": false }'
```

_See code: [src/commands/api-services/update.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/api-services/update.ts)_

## `io-ops hello`

describe the command here

```
USAGE
  $ io-ops hello

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ io-ops hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/hello.ts)_

## `io-ops help [COMMAND]`

display help for io-ops

```
USAGE
  $ io-ops help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `io-ops messages:attributes`

Update message attributes

```
USAGE
  $ io-ops messages:attributes

OPTIONS
  -i, --input=input                   (required) Input file (CSV, with path as first column)
  -p, --parallel=parallel             [default: 1] Number of parallel workers to run
  --isPending=(true|false|undefined)  Set 'isPending' flag
```

_See code: [src/commands/messages/attributes.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/messages/attributes.ts)_

## `io-ops messages:check-content`

Checks validity of messages

```
USAGE
  $ io-ops messages:check-content

OPTIONS
  -i, --input=input        Input file (CSV, with path as first column) - defaults to stdin
  -p, --parallel=parallel  [default: 1] Number of parallel workers to run
```

_See code: [src/commands/messages/check-content.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/messages/check-content.ts)_

## `io-ops messages:list FISCALCODE`

List messages for a fiscalCode

```
USAGE
  $ io-ops messages:list FISCALCODE

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/messages/list.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/messages/list.ts)_

## `io-ops migrate-services METADATA`

Migrate metadata or logos from github

```
USAGE
  $ io-ops migrate-services METADATA

ARGUMENTS
  METADATA  (metadata|logo) Migrate metadata or logo from github

EXAMPLES
  $ io-ops migrate metadata
  $ io-ops migrate logo
```

_See code: [src/commands/migrate-services.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/migrate-services.ts)_

## `io-ops profiles:delete FISCALCODE`

Delete a profile

```
USAGE
  $ io-ops profiles:delete FISCALCODE

OPTIONS
  -a, --all           delete items in all containers
  -m, --message       delete items in message container
  -n, --notification  delete items in notification container
  -p, --profile       delete items in profile container
  -s, --service       delete items in service container
```

_See code: [src/commands/profiles/delete.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/profiles/delete.ts)_

## `io-ops profiles:exist`

Returns the input CSV with a new column that is true if a profile for that fiscal code exists.

```
USAGE
  $ io-ops profiles:exist

OPTIONS
  -i, --input=input        Input file (CSV, with the CF as first column) - defaults to stdin
  -p, --parallel=parallel  [default: 1] Number of parallel workers to run
```

_See code: [src/commands/profiles/exist.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/profiles/exist.ts)_

## `io-ops profiles:list`

Lists all profiles

```
USAGE
  $ io-ops profiles:list

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/profiles/list.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/profiles/list.ts)_

## `io-ops services:check`

```
USAGE
  $ io-ops services:check
```

_See code: [src/commands/services/check.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/services/check.ts)_

## `io-ops services:details`

Retrieve service info and metadata from a given service ID

```
USAGE
  $ io-ops services:details

OPTIONS
  -i, --serviceId=serviceId  The service ID
```

_See code: [src/commands/services/details.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/services/details.ts)_

## `io-ops services:export`

Export visible services

```
USAGE
  $ io-ops services:export

OPTIONS
  -s, --scope=NATIONAL|LOCAL|ALL  [default: ALL] The service scope metadata
  -x, --extended                  show extra columns

  --date=date                     filter services from specified day (Europe/Rome timezone, required format yyyy-MM-dd,
                                  ie 2020-05-25)
```

_See code: [src/commands/services/export.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/services/export.ts)_

## `io-ops services:list`

Lists all services

```
USAGE
  $ io-ops services:list

OPTIONS
  -x, --extended                 show extra columns
  --columns=columns              only show provided columns (comma-separated)
  --csv                          output is csv format [alias: --output=csv]

  --date=date                    filter services from specified day (Europe/Rome timezone, required format yyyy-MM-dd,
                                 ie 2020-05-25)

  --filter=filter                filter property by partial string matching, ex: name=foo

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --only_services=only_services  [default: false] get only services data

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

  --visible=visible              [default: true] get only visible services data
```

_See code: [src/commands/services/list.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/services/list.ts)_

## `io-ops users:create`

Create a new user with a random password in the Active Directory Azure B2C, then create a corresponding user on the API management resource.

```
USAGE
  $ io-ops users:create

OPTIONS
  --json=json  (required) JSON string rapresentation of a user

EXAMPLE
  $ io-ops api-service:create  --json='{ "email": "foobar@example.com","first_name": "string","last_name": "string"}'
```

_See code: [src/commands/users/create.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/create.ts)_

## `io-ops users:get EMAIL`

Gets the user information, that is the complete list of subscription and the complete list of groups for the User identified by the provided email

```
USAGE
  $ io-ops users:get EMAIL

ARGUMENTS
  EMAIL  email

EXAMPLE
  $ io-ops users:get example@example.it
```

_See code: [src/commands/users/get.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/get.ts)_

## `io-ops users:get-all`

Get users max 100 per call use cursor for iterating

```
USAGE
  $ io-ops users:get-all

OPTIONS
  --cursor=cursor  Items to skip

EXAMPLES
  $ io-ops users:get-all
  $ io-ops users:get-all --cursor=100
```

_See code: [src/commands/users/get-all.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/get-all.ts)_

## `io-ops users:subscription EMAIL SUBSCRIPTIONID`

Create a Subscription identified by the provided subscription id for the User identified by the provided email

```
USAGE
  $ io-ops users:subscription EMAIL SUBSCRIPTIONID

ARGUMENTS
  EMAIL           email
  SUBSCRIPTIONID  The id of the Subscription

OPTIONS
  --product_name=product_name  (required) The name of the product

EXAMPLE
  $ io-ops users:subscription  example@example.com SUBSCRIPTIONID --product_name=PRODUCTNAME
```

_See code: [src/commands/users/subscription.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/subscription.ts)_

## `io-ops users:update-groups EMAIL`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ io-ops users:update-groups EMAIL

ARGUMENTS
  EMAIL  email

OPTIONS
  --groups=groups  (required) A comma separeted list of groups

EXAMPLE
  $ io-ops users:update-groups  --groups=ApiInfoRead,ApiLimitedMessageWrite,ApiMessageRead
```

_See code: [src/commands/users/update-groups.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/update-groups.ts)_

## `io-ops users:update_user_token_name EMAIL TOKENNAMEVALUE`

Update the Token Name attribute associated to the User identified by the provided email

```
USAGE
  $ io-ops users:update_user_token_name EMAIL TOKENNAMEVALUE

ARGUMENTS
  EMAIL           email
  TOKENNAMEVALUE  tokenNameValue

EXAMPLE
  $ io-ops users:update-token-name
```

_See code: [src/commands/users/update_user_token_name.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/update_user_token_name.ts)_

## `io-ops users:write-messages EMAIL ACTION`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ io-ops users:write-messages EMAIL ACTION

ARGUMENTS
  EMAIL   email
  ACTION  action

EXAMPLE
  $ io-ops users:write-messages example@example.it enable
```

_See code: [src/commands/users/write-messages.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/write-messages.ts)_

## `io-ops users:write-services EMAIL ACTION`

Update the list of groups (permissions) associated to the User identified by the provided email

```
USAGE
  $ io-ops users:write-services EMAIL ACTION

ARGUMENTS
  EMAIL   email
  ACTION  action

EXAMPLE
  $ io-ops users:write-services example@example.it enable
```

_See code: [src/commands/users/write-services.ts](https://github.com/teamdigitale/io-ops/blob/v0.2.0/src/commands/users/write-services.ts)_
<!-- commandsstop -->

```

```
