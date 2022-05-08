using Flecs;
using System;
using System.Reflection;
using Unigine;
using static Flecs.Macros;
using World = Flecs.World;

namespace UnigineECS
{
    internal static class Core
    {
        private const uint version = (0 << 16) | (0 << 8) | (1);
        private static readonly string stringVersion = (version >> 16 & 0xFF) + "." + (version >> 8 & 0xFF) + "." + (version & 0xFF);

        private static World mainWorld = default;

        public static void Init()
        {
            App.SetBackgroundUpdate(true);
            CreateMainWorld();
            RegisterSystemsAndComponents();

            Log.Message("{0}", $"\nUnigineECS {stringVersion} has been initialized.\n");
        }

        private static void RegisterSystemsAndComponents()
        {
            foreach (Assembly assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                foreach (Type scriptType in assembly.GetTypes())
                {
                    if (typeof(IComponent).IsAssignableFrom(scriptType) && scriptType.IsValueType)
                    {
                        ECS_COMPONENT(mainWorld, scriptType);
                    }

                    if (typeof(ComponentSystem).IsAssignableFrom(scriptType) && !scriptType.IsAbstract && scriptType.GetCustomAttribute(typeof(DisableAutoCreation)) == null)
                    {
                        Activator.CreateInstance(scriptType, new object[] { mainWorld });
                    }
                }
            }
        }

        private static void CreateMainWorld()
        {
            mainWorld = World.Create();

            ecs.enable_admin(mainWorld, 9090);
            ecs.set_threads(mainWorld, (uint)Environment.ProcessorCount);
        }

        public static void Update()
        {
            Profiler.Begin("flecs Update");
            ecs.progress(mainWorld, Game.IFps);
            Profiler.End();
        }

        public static void Shutdown()
        {
            mainWorld.Quit();
            mainWorld.Fini();
        }
    }
}