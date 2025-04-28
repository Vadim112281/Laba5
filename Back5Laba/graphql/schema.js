const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Employee = require('../models/employee');

// Тип для Employee
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    department: { type: GraphQLString },
    room: { type: GraphQLInt },
    computer: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employees: {
      type: GraphQLList(EmployeeType),
      resolve() {
        return Employee.find();
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        department: { type: GraphQLString },
        room: { type: GraphQLInt },
        computer: { type: GraphQLString }
      },
      resolve(parent, args) {
        const employee = new Employee({
          name: args.name,
          department: args.department,
          room: args.room,
          computer: args.computer
        });
        return employee.save();
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        department: { type: GraphQLString },
        room: { type: GraphQLInt },
        computer: { type: GraphQLString }
      },
      async resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Employee.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
