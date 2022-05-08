using System;

using Unigine;

namespace UnigineApp
{
    internal class UnigineApp
    {
        [STAThread]
        private static void Main(string[] args)
        {
            Engine.Init(args);

            AppSystemLogic systemLogic = new AppSystemLogic();
            AppWorldLogic worldLogic = new AppWorldLogic();
            AppEditorLogic editorLogic = new AppEditorLogic();

            Engine.Main(systemLogic, worldLogic, editorLogic);

            Engine.Shutdown();
        }
    }
}