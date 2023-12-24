//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace YVFlashcard.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class UserInfoes
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UserInfoes()
        {
            this.StudyHistories = new HashSet<StudyHistories>();
            this.UserStudyHistories = new HashSet<UserStudyHistories>();
            this.UserLessionInfoes = new HashSet<UserLessionInfoes>();
        }
    
        [Key]public string username { get; set; }
        public string password { get; set; }
        public string fullName { get; set; }
        public Nullable<System.DateTime> dob { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string avatar { get; set; }
        public string gender { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StudyHistories> StudyHistories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserStudyHistories> UserStudyHistories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserLessionInfoes> UserLessionInfoes { get; set; }
    }
}
