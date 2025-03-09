import { v4 } from 'uuid';

class WearThresholdViewModel {
  id = v4();
  productId;
  criterionId;
  label = "";
  type = "OpticalError";
  fixStrategy = "";
  measures = "";
  image;
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
class WearThresholdTreeViewModel {
  id = v4();
  label = "";
  criterion;
  type = "OpticalError";
  fixStrategy = "";
  measures = "";
  image;
  constructor(options = {}) {
    Object.assign(this, options);
  }
}
var WearThresholdType = /* @__PURE__ */ ((WearThresholdType2) => {
  WearThresholdType2["OpticalError"] = "OpticalError";
  WearThresholdType2["FunctionalError"] = "FunctionalError";
  WearThresholdType2["SafetyError"] = "SafetyError";
  return WearThresholdType2;
})(WearThresholdType || {});
const WearThresholdTypeTranslation = {
  OpticalError: "Optischer Fehler",
  FunctionalError: "Funktionaler Fehler",
  SafetyError: "Sicherheitskritischer Fehler"
};
var WearThresholdFixStrategy = /* @__PURE__ */ ((WearThresholdFixStrategy2) => {
  WearThresholdFixStrategy2["Reuse"] = "Reuse";
  WearThresholdFixStrategy2["Repair"] = "Repair";
  WearThresholdFixStrategy2["Recycle"] = "Recycle";
  return WearThresholdFixStrategy2;
})(WearThresholdFixStrategy || {});

export { WearThresholdFixStrategy as W, WearThresholdType as a, WearThresholdTreeViewModel as b, WearThresholdViewModel as c, WearThresholdTypeTranslation as d };
//# sourceMappingURL=wear-threshold.model-BEv4SSMu.js.map
