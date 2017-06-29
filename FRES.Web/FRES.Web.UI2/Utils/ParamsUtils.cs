using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FRES.Web.UI2.Utils
{
    public static class ParamsUtils
    {
        public static bool IsNullOrZero(this decimal? value)
        {
            return value == null || value == 0;
        }
    }
}
