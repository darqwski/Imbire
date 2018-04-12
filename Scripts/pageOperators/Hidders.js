function addGraphHidder()
{
    var hidder=$("<button>",{id:"graphHidder"})
    hidder.click(function () {
        $("#boardDiv").toggle(500)
    })
    hidder.text("Schowaj")
        $("#boardDiv").prepend(hidder)
}