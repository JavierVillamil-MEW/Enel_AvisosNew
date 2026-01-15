
# New Enel Avisos project

Drupal project for Enel Avisos site. Please read all the documentation to have information about installations and deployments.

# Local environment (Only for development)

### Requirements
For the local dev environment is required:
- [Docker](https://www.docker.com/)
- [DDEV](https://ddev.com/)

### Steps to set up
Clone the repo in any place of your machine and execute the following command:
```bash
ddev  start
```
This will create all the required containers and Vhosts configurations on the local machine. If all the process is successful, you will see:
```bash
Successfully started Enel-avisosNew
Your project can be reached at https://enel-avisosnew.ddev.site
See 'ddev describe' for alternate URLs.
```
Now you need to import the DB backup with the following command:
```bash
ddev  import-db  --file=name-of-sql-file.sql
```
It works with .gz files too:
```bash
ddev  import-db  --file=name-of-sql-file.sql.gz
```
Now you can go to the URL and test the site locally.
## Server set up (Production)

### Requirements

For this process is required:
- DB backup.
- Access to the repository
- Backup of the files folder. Usually this folder exists on `/sites/default/files`
- [Composer](https://getcomposer.org/download/)
- PHP 8.3
- [NodeJS v24.11.1](https://nodejs.org/en/download/archive/v24.11.1)

### Set up steps

#### Composer dependencies

The very first step is to clone the repository on the server folder. If you have the SSH keys configured on the server, you should use the SSH URL. After the project is cloned, yo need to install the dependencies with Composer:

```bash
composer  install
```
This command will install all the required dependencies from `composer.json` file.
#### DB import and Files folder
If the process is successful, now you need to import the DB backup to the DB created for this project on the server. After you imported the data, now is time to use the files folder backup, please, copy/move/create the files folder on `/sites/default/`

#### DB connection

Now you need to create the connection from the project to the new DB, you have to go to `/sites/` folder and duplicate the file [example.settings.local.php](https://github.com/JavierVillamil-MEW/Enel_AvisosNew/blob/master/web/sites/example.settings.local.php) on the `/sites/default/` sub folder with the new name `settings.local.php`. After you duplicated the file, open the file and add or enable this configuration at the end of the file:
```php
$databases['default']['default'] = [
	'database' => 'db_name',
	'username' => 'db_username',
	'password' => 'db_password',
	'host' => 'localhost',
	'port' => '3306',
	'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
	'driver' => 'mysql',
	'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
];
```
#### Smoke test
To make a small test o the project, you can flush caches on the system with the following command on the root of the project:
```bash
./vendor/bin/drush  cr
```
The result of the command should be:
```bash
[success] Cache rebuild complete.
```
#### Theme dependencies
Now you need to install the theme dependencies. Go to `/web/themes/custom/likinormas` and install the dependencies with the command:
```bash
npm install
```
#### Build theme files
After the command has finished, you need to build the theme files with the command:
```bash
npm run build
```
If you are on Dev mode, you should use:
```bash
npm run dev
```
#### VHost configuration
A change on the VHost configuration is required, you need to change the entry point for the URL to `/web/` because the `index.php` file is on that sub folder. After this last change, you can go to the domain and test the site.

## Environments

### DEV environment
The current configuration of the project has changed, now there is a configuration for the DEV environment against PROD environment. To enable this mode, you have to go to `/sites/default/settings.local.php` open the file and add or enable this line at the end of the file:
```php
$config['config_split.config_split.dev']['status'] = TRUE;
```
This will enable the DEV mode and will enable some modules not enabled on production. **THIS LINE SHOULD BE WITH THE FALSE STATE ON PRODUCTION**. You need to import the changes of this mode with the command:
```bash
./vendor/bin/drush  cim
```
Accept the import and let the command work, now the site is on Dev mode.

## Deployments

When there is new changes on the repo and you need a deployment, follow these steps:
- Make a DB backup
- Pull from repository `git pull`
- If there is composer changes execute the install command `composer install`
- Execute Drupal deploy command `./vendor/bin/drush deploy` on project root.
- If there are theme changes, please follow the Server set up steps for [Theme files](#theme-dependencies)
- New changes has been deployed
