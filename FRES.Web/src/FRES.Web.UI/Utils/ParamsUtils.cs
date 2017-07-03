namespace FRES.Web.UI.Utils
{
    public static class ParamsUtils
    {
        public static bool IsNullOrZero(this decimal? value)
        {
            return value == null || value == 0;
        }
    }
}