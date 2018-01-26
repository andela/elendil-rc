import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { StaticPage } from "/lib/collections";
import * as Collections from "/lib/collections";
import * as Schemas from "/lib/collections/schemas";

Meteor.methods({
  insertPage: (pageName, pageAddress, pageContent, userId, shopId, isEnabled, createdAt) => {
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(shopId, String);
    check(userId, String);
    check(isEnabled, Boolean);
    check(createdAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      userId,
      shopId,
      isEnabled,
      createdAt
    };

    check(page, Schemas.StaticPage);
    Collections.StaticPage.insert(page);
  },
  updatePage: (_id, pageName, pageAddress, pageContent, userId, shopId, isEnabled, createdAt, updatedAt) => {
    check(_id, String);
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(shopId);
    check(userId, String);
    check(isEnabled, Boolean);
    check(createdAt, Date);
    check(updatedAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      userId,
      shopId,
      isEnabled,
      createdAt,
      updatedAt
    };

    check(page, Schemas.StaticPage);
    Collections.StaticPage.update(_id, { $set: page });
  },
  deletePage: (_id) => {
    check(_id, String);
    StaticPage.remove(_id);
  }
});
