import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { hasPermission } from '../../app/authorization/server';
import { Users } from '../../app/models/server';

Meteor.publish('userAutocomplete', function(selector) {
	const uid = this.userId;
	if (!uid) {
		return this.ready();
	}

	if (!_.isObject(selector)) {
		return this.ready();
	}

	const options = {
		fields: {
			name: 1,
			username: 1,
			status: 1,
		},
		sort: {
			username: 1,
		},
		limit: 10,
	};

	const pub = this;
	const exceptions = selector.exceptions || [];
	const conditions = selector.conditions || {};

	const handlers = {
		added(_id, record) {
			return pub.added('autocompleteRecords', _id, record);
		},
		changed(_id, record) {
			return pub.changed('autocompleteRecords', _id, record);
		},
		removed(_id, record) {
			return pub.removed('autocompleteRecords', _id, record);
		},
	};

	let cursorHandle;
	if (hasPermission(uid, 'view-outside-room')) {
		cursorHandle = Users.findActiveByUsernameOrNameRegexWithExceptionsAndConditions(selector.term, exceptions, conditions, options).observeChanges(handlers);
	} else {
		cursorHandle = Users.findPrivateActiveByUsernameOrNameRegexWithExceptions(this.userId, selector.term, conditions, exceptions, options).observeChanges(handlers);
	}

	this.ready();

	this.onStop(function() {
		return cursorHandle.stop();
	});
});
