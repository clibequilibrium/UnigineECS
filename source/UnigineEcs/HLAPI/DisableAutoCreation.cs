using System;

namespace UnigineECS
{
    [AttributeUsage(System.AttributeTargets.Class, AllowMultiple = false)]
    public class DisableAutoCreation : Attribute
    {
    }
}