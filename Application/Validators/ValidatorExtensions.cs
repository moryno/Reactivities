using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                    .NotEmpty().WithMessage("Password is required")
                    .MinimumLength(6).WithMessage("Password must contain atleast 6 charaters")
                    .Matches("[A-Z]").WithMessage("Password must contain atleast 1 upper letter")
                    .Matches("[a-z]").WithMessage("Password must contain atleast 1 lower letter")
                    .Matches("[0-9]").WithMessage("Password must contain atleast 1 number")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non alphanumeric");

            return options;
        }


    }
}