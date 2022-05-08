using Unigine;
using UnigineECS;

namespace UnigineApp
{
    internal class AppSystemLogic : SystemLogic
    {
        // System logic, it exists during the application life cycle.
        // These methods are called right after corresponding system script's (UnigineScript) methods.

        public AppSystemLogic()
        {
        }

        public override bool Init()
        {
            Core.Init();
            return true;
        }

        // start of the main loop
        public override bool Update()
        {
            Core.Update();
            return true;
        }

        public override bool PostUpdate()
        {
            // Write here code to be called after updating each render frame.

            return true;
        }

        // end of the main loop

        public override bool Shutdown()
        {
            // Write here code to be called on engine shutdown.
            Core.Shutdown();
            return true;
        }
    }
}