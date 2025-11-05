"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelPage = void 0;
const ue_1 = __importStar(require("ue"));
const puerts_1 = require("puerts");
const Path_1 = require("../../Path");
require("Blueprint/BPW/CardInstance/BPW_CardInstance");
const uclass = ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_DuelPage);
const jsclass = puerts_1.blueprint.tojs(uclass);
const uComponent = ue_1.default.Class.Load(Path_1.BlueprintPath.BP_CardMovementComponent);
const jsComponent = puerts_1.blueprint.tojs(uComponent);
class DuelPage {
    Construct() {
        console.log("DuelPage Constructed");
        this.RegisterEvents();
    }
    RegisterEvents() {
        this.Back.OnClicked.Add(() => {
            console.log("Back button clicked");
            const card = ue_1.default.WidgetBlueprintLibrary.Create(this, ue_1.default.Class.Load(Path_1.BlueprintPath.BPW_CardSampleComp), ue_1.default.GameplayStatics.GetPlayerController(this, 0));
            let Transform = new ue_1.default.WidgetTransform();
            const HandSize = this.HandCanvas.GetDesiredSize();
            Transform.Translation.X = 1000;
            Transform.Translation.Y = 700;
            card.SetRenderTransform(Transform);
            card.AddToViewport();
        });
    }
}
exports.DuelPage = DuelPage;
class CardMovementComponent {
    MoveCardToHand() {
        const ViewPortSize = ue_1.default.WidgetLayoutLibrary.GetViewportSize(this);
        const WindowCenter = new ue_1.default.Vector2D(ViewPortSize.X / 2, ViewPortSize.Y / 2);
        const CardClass = ue_1.Class.Load(Path_1.BlueprintPath.BPW_CardSampleComp);
        const CardInstance = ue_1.default.WidgetBlueprintLibrary.Create(this, CardClass, ue_1.default.GameplayStatics.GetPlayerController(this, 0));
        if (CardInstance) {
            this.CardList.Add(CardInstance);
            // 给CardInstance 添加事件:悬挂\不悬挂\点击\抬起
            let transform = new ue_1.default.WidgetTransform();
            transform.Translation.X = WindowCenter.X;
            transform.Translation.Y = WindowCenter.Y;
            CardInstance.SetRenderTransform(transform);
            CardInstance.AddToViewport();
        }
    }
}
puerts_1.blueprint.mixin(jsclass, DuelPage);
puerts_1.blueprint.mixin(jsComponent, CardMovementComponent);
//# sourceMappingURL=BPW_DuelPage.js.map