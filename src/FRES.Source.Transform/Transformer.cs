using FRES.Common;
using FRES.Structure;

namespace FRES.Source.Transform
{
    public abstract class Transformer
    {
        public abstract void Transform();
        public abstract void GetDetails(SourceObj[] objs);
        public abstract void GetDetails(SourceObj obj);

        protected HttpClientHelper Client;
        protected int ParallismDegree = 1;
        protected string SourceName = string.Empty;
        private int parallelismDegree;

        public Transformer(int parallelismDegree = 5)
        {
            Client = new HttpClientHelper();
            SourceName = this.GetType().Name;
            ParallismDegree = parallelismDegree;
        }
    }
}
