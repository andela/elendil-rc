import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { StaticPage } from "/lib/collections";

Template.staticPage.onRendered(() => {
  tinymce.init({
    selector: "textarea.spform",
    height: 500,
    theme: "modern",
    skin_url: "/packages/teamon_tinymce/skins/lightgray", // eslint-disable-line
    plugins: "print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern",
    toolbar1: "formatselect | bold italic strikethrough fontselect fontsizeselect forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat"
  });
});

Template.staticPagePanel.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPage");
  });
});

Template.staticPagePanel.helpers({
  staticPage() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPage.find({
        shopId: Reaction.getShopId()
      });
    }
  }
});

Template.staticPagePanel.events({
  "click .deletePage": function (event) {
    event.preventDefault();
    event.stopPropagation();

    // confirm delete
    Alerts.alert({
      title: "Remove Static Page?",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes"
    }, (confirmed) => {
      if (confirmed) {
        const _id = $(event.currentTarget).parents("tr").attr("id");
        Meteor.call("deletePage", _id);
      }
      return false;
    });
  },

  "click .editPage": function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Get ID of the page and then retrieve from the database
    const _id = $(event.currentTarget).parents("tr").attr("id");
    const pageDetails = StaticPage.find({ _id }).fetch();

    // Set the page form to values gotten from the form for editing
    $(".static-page").find("#sp-name").val(pageDetails[0].pageName);
    $(".static-page").find("#sp-url").val(pageDetails[0].pageAddress);
    $(".static-page").find("#sp-show").prop("checked", pageDetails[0].isEnabled === true);
    $(".static-page").find(".edit-page-data").attr("id", pageDetails[0]._id);
    tinymce.activeEditor.setContent(pageDetails[0].pageContent);

    $(".static-page").find(".save-static-page").html("Update Page");

    // Focus section of page to the form
    $("#main").animate({
      scrollTop: $(".static-page").offset().top
    }, 800);
  }
});

Template.staticPageForm.events({
  "submit form": (event) => {
    event.preventDefault();
    const field = event.target;
    console.log('show static page > ', field.showOnFooter.value);

    const pageName = field.name.value;
    const pageAddress = field.url.value;
    const pageContent = field.content.value;
    const isEnabled = field.showOnFooter.value === "true" ? true : false;
    const userId = Meteor.userId();
    const shopId = Reaction.getShopId();
    let createdAt = new Date();
    const updatedAt = new Date();

    if ($(".static-page").find(".edit-page-data").attr("id") === undefined) {
      Meteor.call(
        "insertPage", pageName, pageAddress, pageContent, userId,
        shopId, isEnabled, createdAt, (err) => {
          if (err) {
            Alerts.toast(err.message, "error");
          } else {
            Alerts.toast("Page Successfully Created", "success");
          }
        }
      );
    } else {
      const _id = $(".static-page").find(".edit-page-data").attr("id");
      const pageDetails = StaticPage.find({ _id }).fetch();
      if (pageDetails.length > 0) {
        createdAt = pageDetails[0].createdAt;
        // Update the data in the database
        Meteor.call(
          "updatePage", _id, pageName, pageAddress, pageContent, userId,
          shopId, isEnabled, createdAt, updatedAt, (err) => {
            if (err) {
              Alerts.toast(err.message, "error");
            } else {
              Alerts.toast("Page Successfully Modified", "success");
            }
          }
        );
      } else {
        Alerts.toast("Oops! Page Not Found, Please create a new Static Page", "error");
      }
      $(".static-page").find(".edit-page-data").attr("id", "");
      $(".static-page").find(".save-static-page").html("Create Page");
    }

    field.name.value = "";
    field.url.value = "";
    tinymce.activeEditor.setContent("");
    $(".static-page").find("#sp-show").prop("checked", false);
  }
});
