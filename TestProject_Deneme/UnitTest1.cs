using NUnit.Framework.Internal;
using System.Reflection.Metadata.Ecma335;

namespace TestProject_Deneme
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }


        [Test]
        public void Test1()
        {


            EvaluaterClass evaluaterClass = new EvaluaterClass();
            ObjClass student = new()
            {
                Name = "Ali",
            };
         
            var appResult = evaluaterClass.Evaluate(student.Name);
    
            Assert.That(true,"Ali", appResult); 


        }
        [Test]
        public void Application_WithUnderAge_TransferredToAutoRejected  ()
        {
            Assert.Pass();
        }
 
    
    
    }


    public class ObjClass
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
    public class EvaluaterClass
    {
        public string Evaluate(string name) { return name; }
    

    }
}
//MethodName_StateUnderTest_ExpectedBehavior
//Example= Evaluate_InvalidPassword_ReturnTrue

//Assert.Equal(expected, actual); expected: Beklenen deðer. Testin baþarýlý olmasý için bu deðerin gerçekleþmesi gerekir.
//actual: Gerçek deðer. Test edilen metodun döndürdüðü sonuç.

