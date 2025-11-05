import UE, { Class, TArray } from 'ue';
import { blueprint } from 'puerts';
import { BlueprintPath } from '../../Path';
import "Blueprint/BPW/CardInstance/BPW_CardInstance";



const uclass = UE.Class.Load(BlueprintPath.BPW_DuelPage);
const jsclass = blueprint.tojs(uclass);
const uComponent = UE.Class.Load(BlueprintPath.BP_CardMovementComponent);
const jsComponent = blueprint.tojs(uComponent);
export interface DuelPage extends UE.Game.Blueprint.BPW.Page.BPW_DuelPage.BPW_DuelPage_C {}

export class DuelPage {
    Construct() {
        console.log("DuelPage Constructed");
        this.RegisterEvents();
    }

    RegisterEvents() {
        this.Back.OnClicked.Add(() => {
            console.log("Back button clicked");
            const card = UE.WidgetBlueprintLibrary.Create(
                this, 
                UE.Class.Load(BlueprintPath.BPW_CardSampleComp), 
                UE.GameplayStatics.GetPlayerController(this, 0)
            );
            let Transform = new UE.WidgetTransform();
            const HandSize = this.HandCanvas.GetDesiredSize();
            Transform.Translation.X = 1000;
            Transform.Translation.Y = 700;
            card.SetRenderTransform(Transform);
            card.AddToViewport();
        });
    }
}


interface CardMovementComponent extends UE.Game.Blueprint.BPW.Page.BP_CardMovementComponent.BP_CardMovementComponent_C {}
class CardMovementComponent {
    
    public MoveCardToHand(): void{
        const ViewPortSize: UE.Vector2D = UE.WidgetLayoutLibrary.GetViewportSize(this);
        const WindowCenter = new UE.Vector2D(ViewPortSize.X / 2, ViewPortSize.Y / 2);
        const CardClass = Class.Load(BlueprintPath.BPW_CardSampleComp);
        const CardInstance = UE.WidgetBlueprintLibrary.Create(
            this,
            CardClass,
            UE.GameplayStatics.GetPlayerController(this, 0)
        );
        if(CardInstance) {
            this.CardList.Add(CardInstance);
            // 给CardInstance 添加事件:悬挂\不悬挂\点击\抬起
            let transform = new UE.WidgetTransform();
            transform.Translation.X = WindowCenter.X;
            transform.Translation.Y = WindowCenter.Y;
            CardInstance.SetRenderTransform(transform);
            CardInstance.AddToViewport();
        }







    }



    
}



blueprint.mixin(jsclass, DuelPage);
blueprint.mixin(jsComponent, CardMovementComponent);