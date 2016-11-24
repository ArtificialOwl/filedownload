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
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 */
(function() {

	/**
	 * @constructs Filedownload
	 */
	var Filedownload = function() {
		this.initialize();
	};

	Filedownload.prototype = {

		locked : true,

		initialize : function() {

			var self = this;
			//
			// this.fileAppLoaded = function() {
			// return !!OCA.Files && !!OCA.Files.App;
			// };
			this._downloadFile = function(url) {
				window.alert('___' + url);
			};

			this.mutationNewFileMenu = function(mutations, observer) {
				if (!self.locked)
					return;

				if (!$('div.newFileMenu').length)
					return;

				// lock
				self.locked = false;
				$('div.newFileMenu').css('width', '400px');

				//
				// done - unlock
				self.locked = true;
			};

			this.updateNewFileMenu = function() {

			}

			// register
			OC.Plugins.register('OCA.Files.NewFileMenu', this);
		},

		attach : function(newFileMenu) {
			var self = this;

			//
			// Mutations
			MutationObserver = window.MutationObserver
					|| window.WebKitMutationObserver;

			var observerNewFileMenu = new MutationObserver(function(mutations,
					observer) {
				self.mutationNewFileMenu(mutations, observer);
			});

			observerNewFileMenu.observe($('#body-user')[0], {
				childList : true,
				attributes : true
			});

			newFileMenu.addMenuEntry({
				id : 'add-file-download',
				displayName : 'Download',
				templateName : 'http://www.perdu.com',
				iconClass : 'icon-download',
				fileType : 'url',
				actionHandler : function(url) {
					self._downloadFile(url);
				}
			});

		}
	};
	OCA.Files.Filedownload = Filedownload;
	OCA.Files.filedownload = new Filedownload();

})();
