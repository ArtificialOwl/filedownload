<?php

/**
 * Nextcloud - filedownload
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@pontapreta.net>
 * @copyright Maxence Lange 2016
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
namespace OCA\Filedownload\AppInfo;

use \OCA\Filedownload\Service\MiscService;
use OCP\AppFramework\App;

// use OCP\Util;
class Application extends App
{

    /**
     *
     * @param array $params            
     */
    public function __construct(array $params = array())
    {
        parent::__construct('filedownload', $params);
        $container = $this->getContainer();
        
        /**
         * Controllers
         */
        $container->registerService('MiscService', function ($c) {
            return new MiscService($c->query('Logger'), $c->query('AppName'));
        });
        
        $container->registerService('Logger', function ($c) {
            return $c->query('ServerContainer')
                ->getLogger();
        });
    }

    public function register()
    {
        \OC::$server->getEventDispatcher()->addListener('OCA\Files::loadAdditionalScripts', function () {
            \OCP\Util::addScript('filedownload', 'download');
            \OCP\Util::addStyle('filedownload', 'download');
        });
    }
}
